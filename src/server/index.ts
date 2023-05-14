import express from "express";
import robotsRouter from "./routes/robots/robotsRouter.js";
import {
  generalError,
  notFoundError,
} from "../middlewares/errorMiddlewares.js";

const app = express();
app.disable("x-powered-by");

app.use("/robots", robotsRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
