import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../CustomError/CustomError";

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(401, "Missing token");

      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRETS!);

    next();
  } catch (error: unknown) {
    next(error);
  }
};
