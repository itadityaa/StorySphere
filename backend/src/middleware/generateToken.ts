import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const generateToken = async (userId: ObjectId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const payload = jwt.sign({ userId, userRole: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return payload;
  } catch (error: any) {
    console.error(`Failed to generate a token: ${error}`);
    throw new Error(`Failed to generate a token: ${error.message}`);
  }
};

export default generateToken;
