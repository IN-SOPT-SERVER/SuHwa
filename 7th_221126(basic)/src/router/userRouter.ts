import { Router } from "express";
import { userController } from "../controller";
import { auth } from "../middlewares";
import { body } from "express-validator";

const userRouter : Router = Router();

//CRUD
//C
//* 유저 생성 - POST api/user //회원가입
userRouter.post(
    "/"
    ,[
      body("name").notEmpty(),
      body("email").notEmpty(),
      body("email").isEmail(),
      body("password").notEmpty(),
      body("password").isLength({ min: 6 })
    ],
    userController.createUser
  );

//R
//전체조회
//전체 유저정보를 보려면 일단 해당 서비스의 회원이야 하니까
userRouter.get("/", auth, userController.getAllUser);
//한명씩 조회
userRouter.get("/:userId", auth, userController.getUserById);



//U
//update를 하려면 해당 유저아이디로 로그인된 상태여야하니까
userRouter.patch("/:userId", auth ,userController.updateUser);

//D
//delete를 하려면 해당 유저아이디로 로그인된 상태여야하니까
userRouter.delete("/:userId", auth, userController.deleteUser);



//* 로그인 - POST api/user/signin
userRouter.post(
    "/signin",
    [
      body("email").notEmpty(),
      body("email").isEmail(),
      body("password").notEmpty(),
      body("password").isLength({ min: 6 }),
    ],
    userController.signInUser
  );
  

export default userRouter; //router로 내보냄