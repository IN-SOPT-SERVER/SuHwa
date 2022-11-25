import { Router } from "express";
import mediaRouter from "./mediaRouter";
import userRouter from "./userRouter";

const router : Router = Router();

router.use("/media",mediaRouter);

router.use("/user", userRouter);


export default router;




