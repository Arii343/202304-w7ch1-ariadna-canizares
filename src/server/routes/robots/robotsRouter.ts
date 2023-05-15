import { Router as router } from "express";
import {
  getRobot,
  getRobots,
} from "../../controllers/robots/robotsControllers.js";

const robotsRouter = router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:id", getRobot);

export default robotsRouter;
