import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import CustomError from "../../../CustomError/CustomError";
import User from "../../../database/models/User";

type UserCredencialAlias = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string }
>;

export const loginUser = async (
  req: UserCredencialAlias,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(401, "Wrong credentials");

      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
