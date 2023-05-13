import { Schema, model } from "mongoose";

const robotSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  speed: Number,
  resistence: Number,
  dateOfCreation: String,
});

const Robot = model("Robot", robotSchema, "robots");

export default Robot;
