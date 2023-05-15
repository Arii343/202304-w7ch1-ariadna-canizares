import express from "express";
import robotsRouter from "./routes/robots/robotsRouter.js";
import {
  generalError,
  notFoundError,
} from "../middlewares/errorMiddlewares.js";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/robots/userRouter.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w6chwe-constantin-dusescu-aria.netlify.app",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.disable("x-powered-by");

app.use(cors(options));

app.use(express.json());

app.use(morgan("dev"));

app.use("/user", userRouter);

app.use("/robots", robotsRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
