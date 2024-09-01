import express, { Request, Response, NextFunction, Router } from "express";
import { Story } from "../model/story.model";
import { Comment } from "../model/comment.model";

const router: Router = express.Router();

router.use(express.json());

// Utility function to handle async route errors
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };

// Create a new story
router.post(
  "/create-story",
  asyncHandler(async (req: Request, res: Response) => {
    console.log(
      `Story data from the API: ${JSON.stringify(req.body, null, 2)}`
    );

    const newStory = new Story({ ...req.body });
    await newStory.save();

    res
      .status(201)
      .json({ message: "Story created successfully", data: req.body });
  })
);

// Get all stories
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { search, category, location } = req.query;
    let query: any = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search as string, $options: "i" } },
          { description: { $regex: search as string, $options: "i" } },
          { content: { $regex: search as string, $options: "i" } },
        ],
      };
    }

    if (category) {
      query.category = category;
    }

    if (location) {
      query.location = location;
    }

    const stories = await Story.find(query)
      .populate("author", "email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All posts retrieved successfully!",
      stories,
    });
  })
);

// Get a single story by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const story = await Story.findById(id);

    if (!story) {
      res.status(404).json({ message: "Story not found" });
      return; // Ensure nothing else runs after the response is sent
    }

    const comment = await Comment.find({ storyId: id })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Story retrieved successfully!", story });
  })
);

// Update a story by ID
router.put(
  "/update-story/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedStory = await Story.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedStory) {
      res.status(404).json({ message: "Story not found" });
      return; // Ensure nothing else runs after the response is sent
    }

    res
      .status(200)
      .json({ message: "Story updated successfully!", updatedStory });
  })
);

// Delete a story by ID
router.delete(
  "/delete-story/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedStory = await Story.findByIdAndDelete(id);

    if (!deletedStory) {
      res.status(404).json({ message: "Story not found" });
      return;
    }

    await Comment.deleteMany({ storyId: id }); // Delete all comments associated with the story

    res
      .status(200)
      .json({ message: "Story deleted successfully!", deletedStory });
  })
);

// Related stories
router.get(
  "/related-stories/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const story = await Story.findById(id);

    if (!story) {
      res.status(404).json({ message: "Story not found" });
      return; // Ensure nothing else runs after the response is sent
    }

    const titleRegex = new RegExp(story.title.split(" ").join("|"), "i");
    const relatedQuery = {
      _id: { $ne: story._id },
      title: { $regex: titleRegex },
    };

    const relatedStories = await Story.find(relatedQuery).limit(3);

    res.status(200).json({
      message: "Related stories retrieved successfully!",
      relatedStories,
    });
  })
);

export default router;
