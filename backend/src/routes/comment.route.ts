import express, { Request, Response, Router } from "express";
import { Comment } from "../model/comment.model";
const router: Router = express.Router();

// Create a new comment
router.post("/post-comment", async (req: Request, res: Response) => {
  try {
    const { comment, user, storyId } = req.body;

    // Validate the request body
    if (!comment || !user || !storyId) {
      return res.status(400).send({ message: "All fields are required." });
    }

    // Create a new comment instance
    const newComment = new Comment({
      comment,
      user,
      storyId,
    });

    // Save the comment to the database
    await newComment.save();

    // Respond with success
    res
      .status(200)
      .send({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    console.log("Error creating comment", error);
    res.status(500).send({ message: "Error creating comment", error });
  }
});

// Get all comments and return counts
router.get("/get-comments", async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({});
    const commentCount = comments.length;
    res.status(200).send({ message: "Total Comments:", commentCount });
  } catch (error) {
    console.log("Error getting comments", error);
    res.status(500).send({ message: "Error getting comments", error });
  }
});

export default router;
