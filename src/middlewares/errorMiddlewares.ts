import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../CustomError/CustomError.js";
import { debug } from "../utils/debug.js";

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Sorry endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(error.message);

  const statusCode = error.statusCode || 500;
  const message = error.statusCode
    ? error.message
    : "General error try again soon";

  res.status(statusCode).json({ message });
};
