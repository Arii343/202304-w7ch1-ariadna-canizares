import { type Types } from "mongoose";

export interface RobotStructure {
  name: string;
  imageUrl: string;
  speed: number;
  resistence: number;
  dateOfCreation: string;
}

export interface RobotsMockStructure extends RobotStructure {
  _id: Types.ObjectId;
}
