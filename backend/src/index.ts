import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app: Express = express();
const port = process.env.PORT || 3000;

// Parse options
app.use(express.json());
app.use(cors());

// Load environment variables
dotenv.config();
const MONGO_URL = process.env.MONGODB_URL;

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
