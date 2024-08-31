// import express, { Request, Response } from "express";
// import { Story } from "../model/story.model";

// const router = express.Router();

// // Middleware to parse JSON bodies
// router.use(express.json());

// // Create a new story
// router.post("/create-story", async (req: Request, res: Response) => {
//   try {
//     // Log the story data from the API using string templates
//     console.log(
//       `Story data from the API: ${JSON.stringify(req.body, null, 2)}`
//     );

//     // Send data to MongoDB
//     const newStory = new Story({ ...req.body });
//     // Save the story data to MongoDB
//     await newStory.save();

//     // Process the story data and send a response back
//     res
//       .status(201)
//       .send({ message: "Story created successfully", data: req.body });
//   } catch (error: any) {
//     console.error(`Error: ${error}`);
//     res.status(500).send({ message: `Error creating post: ${error.message}` });
//   }
// });

// // Get all stories
// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const { search, category, location } = req.query;
//     let query: any = {};

//     if (search) {
//       query = {
//         $or: [
//           { title: { $regex: search as string, $options: "i" } },
//           { description: { $regex: search as string, $options: "i" } },
//           { content: { $regex: search as string, $options: "i" } },
//         ],
//       };
//     }

//     if (category) {
//       query.category = category;
//     }

//     if (location) {
//       query.location = location;
//     }

//     const stories = await Story.find(query).sort({ createdAt: -1 });

//     // const stories = await Story.find();
//     res
//       .status(200)
//       .send({ message: "All posts retrieved successfully!", stories: stories });
//   } catch (error: any) {
//     console.error(`Error: ${error}`);
//     res
//       .status(500)
//       .send({ message: `Error fetching stories: ${error.message}` });
//   }
// });

// // Get a single story by ID
// router.get("/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const story = await Story.findById(id);

//     if (!story) {
//       return res.status(404).send({ message: "Story not found" });
//     }

//     res.status(200).send({ message: "Story retrieved successfully!", story });
//   } catch (error: any) {
//     console.error(`Error: ${error}`);
//     res.status(500).send({ message: `Error fetching story: ${error.message}` });
//   }
// });

// // Update a story by ID
// router.put("/update-story/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const updatedStory = await Story.findByIdAndUpdate(id, req.body as any, {
//       new: true,
//     });

//     if (!updatedStory) {
//       return res.status(404).send({ message: "Story not found" });
//     }

//     res
//       .status(200)
//       .send({ message: "Story updated successfully!", updatedStory });
//   } catch (error: any) {
//     console.error(`Error: ${error}`);
//     res.status(500).send({ message: `Error updating story: ${error.message}` });
//   }
// });

// // Delete a story by ID
// router.delete("/delete-story/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const deletedStory = await Story.findByIdAndDelete(id);

//     if (!deletedStory) {
//       return res.status(404).send({ message: "Story not found" });
//     }

//     res
//       .status(200)
//       .send({ message: "Story deleted successfully!", deletedStory });
//   } catch (error: any) {
//     console.error(`Error: ${error}`);
//     res.status(500).send({ message: `Error deleting story: ${error.message}` });
//   }
// });

// // Related stories
// router.get("/related-stories/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const story = await Story.findById(id);

//     if (!story) {
//       return res.status(404).send({ message: "Story not found" });
//     }

//     const titleRegex = new RegExp(story.title.split(" ").join("|"), "i");
//     const relatedQuery = {
//       _id: { $ne: story._id },
//       title: { $regex: titleRegex },
//     };

//     const relatedStories = await Story.find(relatedQuery).limit(3);

//     // const relatedStories = await Story.find({
//     //   $or: [ { category: story.category }, { author: story.author }],
//     //   _id: { $ne: story._id },
//     // }).limit(3);

//     res.status(200).send({
//       message: "Related stories retrieved successfully!",
//       relatedStories,
//     });
//   } catch (error: any) {
//     console.error(`Error: ${error}`);
//     res
//       .status(500)
//       .send({ message: `Error fetching related stories: ${error.message}` });
//   }
// });

// export default router;

import express, { Request, Response, NextFunction } from "express";
import { Story } from "../model/story.model";

const router = express.Router();

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

    const stories = await Story.find(query).sort({ createdAt: -1 });

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
      return; // Ensure nothing else runs after the response is sent
    }

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
