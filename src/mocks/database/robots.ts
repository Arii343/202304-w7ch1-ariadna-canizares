import { Types } from "mongoose";
import { type RobotsMockStructure } from "../../types";

export const robotMock: RobotsMockStructure = {
  _id: new Types.ObjectId(),
  name: "R2D2",
  imageUrl:
    "https://static.wikia.nocookie.net/esstarwars/images/e/e2/Artoo-Fathead.png/revision/latest?cb=20180108172244",
  speed: 10,
  resistence: 8,
  dateOfCreation: "10/03/2020",
};

export const robotsMock: RobotsMockStructure[] = [robotMock];
