import { Schema, model } from "mongoose";

const caracteristicsSchema = new Schema({
  speed: Number,
  resistence: Number,
  creationeDate: Date,
});

const robotSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  caracteristics: caracteristicsSchema,
});

const Robot = model("Robot", robotSchema, "robots");

export default Robot;
