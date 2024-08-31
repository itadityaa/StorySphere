import express, { Express, Request, Response, Router } from "express";
import { Comment } from "../model/comment.model";
const router: Router = express.Router();

// Create a new comment
router.post("/post-comment", async (req: Request, res: Response) => {
  //   console.log("Create a new comment", req.body);
  try {
    const { commentBody } = req.body;
    await commentBody.save();
    res
      .status(200)
      .send({ message: "Comment created successfully", comment: commentBody });
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
//     const comments = await Comment.countDocuments({});
//     res.status(200).send(comments);
//   } catch (error) {
//     console.log("Error getting comments", error);
//     res.status(500).send({ message: "Error getting comments", error });
//   }
// });

export default router;
