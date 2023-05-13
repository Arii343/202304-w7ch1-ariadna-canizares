import { Router as router } from "express";
import { getRobots } from "../../controllers/robots/robotsControllers.js";

const robotsRouter = router();

robotsRouter.get("/", getRobots);

export default robotsRouter;
