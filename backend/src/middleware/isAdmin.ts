import { Request, Response, NextFunction } from "express";

const isAdmin = (req: any, res: Response, next: NextFunction) => {
  console.log(req.role);
  if (req.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }
  next();
};

export default isAdmin;
