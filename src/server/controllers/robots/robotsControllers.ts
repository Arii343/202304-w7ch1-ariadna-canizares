import { type NextFunction, type Request, type Response } from "express";
import Robot from "../../../database/models/Robots.js";
import CustomError from "../../../CustomError/CustomError.js";

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

export const getRobot = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const robot = await Robot.findById(id).exec();

    if (!robot) {
      const error = new CustomError(404, "Robot not found");

      throw error;
    }

    res.status(200).json({ robot });
  } catch (error: unknown) {
    next(error);
  }
};
