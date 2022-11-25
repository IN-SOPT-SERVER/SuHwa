import { UserUpdateDTO } from './../interfaces/UserUpdateDTO';
import { fail, success } from './../constants/response';
import { Request, Response } from "express";
import { userService } from "../service";
import sc from "../constants/statusCode";
import { validationResult } from "express-validator";
import { UserCreateDTO } from "../interfaces/UserCreateDTO"; 
import { UserSignInDTO } from '../interfaces/UserSignInDTO';
import jwtHandler from '../modules/jwtHandler';
import rm from "../constants/responseMessage";



const createUser = async (req: Request, res: Response) => {

    //? validation의 결과를 바탕으로 분기 처리
    const error = validationResult(req);
    
    if(!error.isEmpty()) 
      return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST))
  
    //? 기존 비구조화 할당 방식 -> DTO의 형태
    const userCreateDto: UserCreateDTO = req.body;
    const data = await userService.createUser(userCreateDto);
  
    if (!data) {
      return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SIGNUP_FAIL))
    }
   // ================== 여기 추가 ========================
   //? 아까 만든 jwtHandler 내 sign 함수를 이용해 accessToken 생성
   
   const accessToken = jwtHandler.sign(data.id);
   
   const result = {
    id: data.id,
    name: data.userName,
    accessToken,
    };



    return res.status(sc.CREATED).send(success(sc.CREATED, rm.SIGNUP_SUCCESS, result))
  };

const getUserById = async ( req : Request, res : Response) => {
    const { userId } = req.params;

    // auth 미들웨어에서 해석한 토큰의 아이디와 현재 조회하려하는 토큰 아이디가 다를때
    if(req.body.userId!=userId){
        return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED,rm.DIFFERENT_USER))
    }
    const data = await userService.getUserById(+userId);

    if(!data){
        return res.status(404).json({
            status : 404,
            message : "아이디를 가진 유저를 찾을 수 없음"
        });
    }
    else{
        return res.status(200).json({
            status : 200,
            message : `유저 ${userId}를 조회하는데 성공`,
            data
        });
    }

    

};

const getAllUser = async ( req : Request, res : Response) => {
    const data = await userService.getAllUser();

    return res.status(200).json({
        status : 200,
        message : "유저 전체조회 성공",
        data
    });

};

const updateUser = async ( req : Request, res : Response) => {

    const { userId } = req.params;
    // auth 미들웨어에서 해석한 토큰의 아이디와 현재 업데이트하려하는 토큰 아이디가 다를때
    if(req.body.userId!=userId){
        return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED,rm.DIFFERENT_USER))
    }

    const userUpdateDto : UserUpdateDTO = req.body;

    //이름을 고칠경우, response에서 유저이름은 "name"이라는 필드에 담겨서 옴으로 따로 dto에 넣어줌
    if(req.body?.name){
        userUpdateDto.userName=req.body?.name;
    }

    //아무런 업데이트 정보가 없을경우
    if(!userUpdateDto.userName && !userUpdateDto.age && !userUpdateDto.email && !userUpdateDto.password){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.NO_UPDATE_CONTENT));
    }

    if(userUpdateDto.password && userUpdateDto.password?.length<6)
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.BAD_REQUEST));
    
    try{
        const updatedUser = await userService.updateUser(+userId, userUpdateDto);
        if(!updatedUser){
            return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.BAD_REQUEST));       
        }
        else{
            return res.status(sc.OK).send(success(sc.OK,rm.UPDATE_USER_SUCCESS,updatedUser));
        }


    }catch(error){
        console.log(error);
        res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
    

    

};

const deleteUser = async ( req : Request, res : Response) => {
    const { userId } = req.params;
    // auth 미들웨어에서 해석한 토큰의 아이디와 현재 업데이트하려하는 토큰 아이디가 다를때
    if(req.body.userId!=userId){
        return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED,rm.DIFFERENT_USER))
    }

   await userService.deleteUser(+userId);
    
    return res.status(200).json({
        status : 200,
        message : `${userId} 번 유저 삭제 성공`
    });


};


//* 로그인
const signInUser = async (req: Request, res: Response) => {
    const error = validationResult(req);
    
    if (!error.isEmpty()) {
      return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
    }
  
    const userSignInDto: UserSignInDTO = req.body;
  
    try {
      const userId = await userService.signIn(userSignInDto);
  
      if (!userId) return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.NOT_FOUND));
      else if (userId === sc.UNAUTHORIZED)
        return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_PASSWORD));
  
      const accessToken = jwtHandler.sign(userId);
  
      const result = {
        id: userId,
        accessToken,
      };
  
      res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, result));
    } catch (e) {
      console.log(error);
      //? 서버 내부에서 오류 발생
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  };





const userController={
    createUser,
    getUserById,
    getAllUser,
    updateUser,
    deleteUser,
    signInUser
};

export default userController;