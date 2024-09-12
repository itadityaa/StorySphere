import express, { Request, Response, Router } from "express";
import { User } from "../model/user.model";
import generateToken from "../middleware/generateToken";
import mongoose from "mongoose";

const router: Router = express.Router();

// Register a new user
router.post("/register", async (req: Request, res: Response) => {
  // Register a new user
  try {
    const { userName, email, password } = req.body;
    const newUser = new User({ userName, email, password });
    // console.log(`New User: ${newUser}`);

    await newUser.save();

    res.status(200).send({ message: "User registered successfully" });
  } catch (error: any) {
    console.error(`Failed to register a User: ${error}`);
    res
      .status(500)
      .send({ message: `Error registering user: ${error.message}` });
  }
});

// Login an existing user
router.post("/login", async (req: Request, res: Response) => {
  // Login an existing user
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = await generateToken(user._id as mongoose.ObjectId);
    // console.log(`Token: ${token}`);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      secure: true,
    });

    res.status(200).send({
      message: "User logged in successfully",
      token,
      user: {
        userName: user.userName,
        email: user.email,
        role: user.role,
        _id: user._id,
      },
    });
  } catch (error: any) {
    console.error(`Failed to login a User: ${error}`);
    res
      .status(500)
      .send({ message: `Error logging in user: ${error.message}` });
  }
});

// Logout an existing user
router.post("/logout", async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: "User logged out successfully" });
  } catch (error: any) {
    console.error(`Failed to logout a User: ${error}`);
    res
      .status(500)
      .send({ message: `Error logging out user: ${error.message}` });
  }
});

// Get all users
router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "id email role userName");
    const userCount = await User.countDocuments();

    res
      .status(200)
      .send({ message: "All users fetched successfully", users, userCount });
  } catch (error: any) {
    console.error(`Failed to get all Users: ${error}`);
    res
      .status(500)
      .send({ message: `Error getting all users: ${error.message}` });
  }
});

// Delete a user
router.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error(`Failed to delete a User: ${error}`);
    res.status(500).send({ message: `Error deleting user: ${error.message}` });
  }
});

// Update a user role
router.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User role updated successfully" });
  } catch (error: any) {
    console.error(`Failed to update a User role: ${error}`);
    res
      .status(500)
      .send({ message: `Error updating user role: ${error.message}` });
  }
});

// Update a user
router.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userName, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { userName, email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User updated successfully" });
  } catch (error: any) {
    console.error(`Failed to update a User: ${error}`);
    res.status(500).send({ message: `Error updating user: ${error.message}` });
  }
});

export default router;
