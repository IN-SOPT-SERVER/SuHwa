import { body } from 'express-validator';
import { Router, Request, Response } from "express";
import { userController } from "../controller";

const userRouter : Router = Router();

//유저 생성 : 회원가입
userRouter.post("/signup",[
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("email").isEmail(),
    body("age").notEmpty,
    body("age").isNumeric,
    body("password").notEmpty()
],userController.createUser);

//유저 로그인
userRouter.post("/longin",[
    body("email").notEmpty(),
    body("email").isEmail,
    body("password").notEmpty()
], userController.logInUser);


export default userRouter;