import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sc } from "../constants";
import { UserCreateDTO } from "../interfaces/UserCreateDTO";

const prisma = new PrismaClient();


/*
const createUser = async ( name : string , email : string, age : number) => {
    const data = await prisma.user.create({
        data : {
            userName : name,
            age : age,
            email : email

        },
    });

    return data;
};
*/

const createUser = async (userCreateDto: UserCreateDTO) => {
    //? 넘겨받은 password를 bcrypt의 도움을 받아 암호화
    const salt = await bcrypt.genSalt(10); //^ 매우 작은 임의의 랜덤 텍스트 salt
    const password = await bcrypt.hash(userCreateDto.password, salt); //^ 위에서 랜덤을 생성한 salt를 이용해 암호화
  
    const data = await prisma.user.create({
      data: {
        userName: userCreateDto?.name,
        age: userCreateDto?.age,
        email: userCreateDto.email,
        password,
      },
    });
  
    return data;
  };


const getUserById = async (userId : number) => {
    const data = await prisma.user.findUnique({
        where : {
            id : userId
        }
    });

    return data;
};

const getAllUser = async () => {
    const data = await prisma.user.findMany();
    return data;
};

const updateUser = async ( userId : number, username : string) => {
    const data = await prisma.user.update({
        where:{
            id : userId
        },
        data : {
            userName : username
        }
    });

    return data;
};

const deleteUser = async ( userId : number) => {
    const data = await prisma.user.delete({
        where : {
            id : userId
        }
    });

};

const userService = {
    createUser,
    getUserById,
    getAllUser,
    updateUser,
    deleteUser,
};

export default userService;