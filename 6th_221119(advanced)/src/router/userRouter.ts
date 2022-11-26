import { body } from 'express-validator';
import { Router } from "express";
import  userController  from "../controller/userController";

const userRouter : Router = Router();

//유저 생성 : 회원가입
userRouter.post(
    "/signup",
    /*
    [
        body("name").notEmpty(),
        body("email").notEmpty(),
        body("email").isEmail(),
        body("age").notEmpty,
        body("age").isNumeric,
        body("password").notEmpty(),
    ],*/()=>{console.log("회원가입 라우터에 들어옴?");},
    userController.createUser
    );



//유저 로그인
userRouter.post(
    "/login",
/*[
    body("email").notEmpty(),
    body("email").isEmail,
    body("password").notEmpty()
]
,*/ ()=>{console.log("로그인 라우터에 들어옴?");}
,userController.logInUser
);


export default userRouter;