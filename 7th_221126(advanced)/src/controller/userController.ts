import { UserLogInDTO } from './../interface/user/UserLonInDTO';
import { success, fail } from '../constants/response';
import { sc, rm} from '../constants';
import { validationResult } from 'express-validator';
import { Request, Response } from "express";
import { UserCreateDTO} from '../interface/user/UserCreateDTO';
import { userService } from '../service';
import jwtHandler from '../modules/jwtHandler';


const createUser = async( req : Request, res : Response)=>{
    console.log("1");
    
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.BAD_REQUEST));
    }

    const userCreateDto : UserCreateDTO = req.body;

    const createdUser = await userService.createUser(userCreateDto);

    if(!createdUser){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.SIGNUP_FAIL))
    }

    const accessToken = jwtHandler.sign((createdUser as any).id);

    const data = {
        id : (createdUser as any).id,
        name : (createdUser as any).userName,
        accessToken
    };

    return res.status(sc.CREATED).send(success(sc.CREATED, rm.SIGNUP_SUCCESS, data));
}

const logInUser = async( req : Request, res : Response)=>{
    console.log("로그인컨트롤러들ㄹ어롬?");
    
    const error = validationResult(req);
    
    if (!error.isEmpty()) {
      return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
    }

    const userLoginDto : UserLogInDTO = req.body;

    try{
        const userId = await userService.logInUser(userLoginDto);

        if(!userId) return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.NOT_FOUND));
        else if (userId=== sc.UNAUTHORIZED) return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_PASSWORD));

        const accessToken = jwtHandler.sign((userId as number));

        const data = {
            id : userId,
            accessToken
        };

        res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, data));

    
    }
    catch(error){
        console.log(error);
        res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));

        
    }
}


const userController={
    createUser,
    logInUser
}

export default userController;