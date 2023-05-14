import express from "express";
import robotsRouter from "./routes/robots/robotsRouter.js";
import {
  generalError,
  notFoundError,
} from "../middlewares/errorMiddlewares.js";
import morgan from "morgan";
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://robots-api-w6s9.onrender.com/",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.disable("x-powered-by");

app.use(cors(options));

app.use(express.json());

app.use(morgan("dev"));

app.use("/robots", robotsRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
