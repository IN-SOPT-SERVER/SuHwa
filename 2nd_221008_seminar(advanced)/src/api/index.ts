import exp from "constants";
import express, {NextFunction, Request, Response, Router } from "express";

const router : Router=express.Router();

router.use("/user",require('./user'));
router.use("/blog",require('./blog'));
router.use("/comment",require('./comment'));
router.use("/movie",require('./movie'));
router.use("/members",require('./members'));

module.exports=router;