import { Router as router } from "express";
import { loginUser } from "../../controllers/users/userControllers";

const userRouter = router();

userRouter.post("/login", loginUser);

export default userRouter;
