import { Request, Response } from "express";
import { userService } from "../service";
 
const createUser = async ( req : Request, res : Response) => {
    const { userName, email, age } = req.body;

    if (!userName || !age){
        return res.status(400).json({
            status : 400,
            message : "유저 생성 실패 : 유저이름 또는 나이가 없습니다."
        });
    }

    if( !email){
        (email as string) = "email없음";
    }
    const data = await userService.createUser(userName, email, age);

    if (!data){
        return res.status(400).json({
            status : 400,
            message : "유저 생성 실패 "
        });
    }
    else{
        return res.status(201).json({
            status : 201,
            message : "유저생성성공",
            data : data,
        });
    }
};

const getUserById = async ( req : Request, res : Response) => {
    const { userId } = req.params;

    

};

const getAllUser = async ( req : Request, res : Response) => {

};

const updateUser = async ( req : Request, res : Response) => {

};

const deleteUser = async ( req : Request, res : Response) => {

};

const userController={
    createUser,
    getUserById,
    getAllUser,
    updateUser,
    deleteUser,
};

export default userController;