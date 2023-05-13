import express from "express";
import robotsRouter from "./routes/robots/robotsRouter.js";

const app = express();
app.disable("x-powered-by");

app.use("/robots", robotsRouter);

export default app;
