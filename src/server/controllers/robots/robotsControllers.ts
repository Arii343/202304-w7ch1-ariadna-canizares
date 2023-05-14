import { type NextFunction, type Request, type Response } from "express";
import Robot from "../../../database/models/Robots.js";

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const robots = await Robot.find().exec();
    res.status(200).json({ robots });
  } catch (error: unknown) {
    next(error);
  }
};
