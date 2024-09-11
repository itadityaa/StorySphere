import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT || 3000;

// Parse options
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Load environment variables
dotenv.config();
const MONGO_URL = process.env.MONGODB_URL;

// Routes
import storyRoutes from "./routes/story.route";
import commentRoutes from "./routes/comment.route";
import authUserRoutes from "./routes/authUser.route";

app.use("/api/stories", storyRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authUserRoutes);

async function main() {
  await mongoose.connect(MONGO_URL as string);

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello Devs!");
  });
}

main()
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
