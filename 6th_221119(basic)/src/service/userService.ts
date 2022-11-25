import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sc } from "../constants";
import { UserCreateDTO } from "../interfaces/UserCreateDTO";
import { UserSignInDTO } from "../interfaces/UserSignInDTO";

const prisma = new PrismaClient();



const createUser = async (userCreateDto: UserCreateDTO) => {
    //? 넘겨받은 password를 bcrypt의 도움을 받아 암호화
    const salt = await bcrypt.genSalt(10); //^ 매우 작은 임의의 랜덤 텍스트 salt
    const password = await bcrypt.hash(userCreateDto.password, salt); //^ 위에서 랜덤을 생성한 salt를 이용해 암호화
  
    //왜 어떤건 ?가 붙고 어떤건 ?가 안붙는 거지?
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

//* 로그인
const signIn = async (userSignInDto: UserSignInDTO) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: userSignInDto.email,
        },
      });
      if (!user) return null;
  
      //? bcrypt가 DB에 저장된 기존 password와 넘겨 받은 password를 대조하고,
      //? match false시 401을 리턴
      const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
      if (!isMatch) return sc.UNAUTHORIZED;
  
      return user.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const userService = {
    createUser,
    getUserById,
    getAllUser,
    updateUser,
    deleteUser,
    signIn
};

export default userService;