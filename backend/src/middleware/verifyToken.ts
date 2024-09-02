import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

interface DecodedToken {
  userId: string;
  userRole: string;
}

const verifyToken = (req: any, res: any, next: any): void => {
  try {
    const token: string = req.headers.authorization.split(" ")[1];
    // const token: string = req.cookies.token; // Implement this while ceating the frontend
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded: DecodedToken = jwt.verify(token, JWT_SECRET) as DecodedToken;
    if (!decoded.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.userId;
    req.role = decoded.userRole;
    next();
  } catch (error: any) {
    console.error(`Failed to verify token: ${error}`);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
