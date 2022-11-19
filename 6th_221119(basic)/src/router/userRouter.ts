import { Router } from "express";
import { userController } from "../controller";
import { auth } from "../middlwares";
import { body } from "express-validator";

const userRouter : Router = Router();

//CRUD
//C
userRouter.post("/", userController.createUser);

//* 유저 생성 - POST api/user //회원가입
userRouter.post(
    "/",
    [body("name").notEmpty(), body("email").notEmpty(), body("password").isLength({ min: 6 })],
    userController.createUser
  );



//R
//전체조회
userRouter.get("/", userController.getAllUser);
//한명씩 조회
userRouter.get("/:userId", auth, userController.getUserById);

//U
userRouter.patch("/:userId", userController.updateUser);

//D
userRouter.delete("/:userId", userController.deleteUser);



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