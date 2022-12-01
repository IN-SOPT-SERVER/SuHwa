import { UserUpdateDTO } from '../interfaces/user/UserUpdateDTO';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sc } from "../constants";
import { UserCreateDTO } from "../interfaces/user/UserCreateDTO";
import { UserSignInDTO } from "../interfaces/user/UserSignInDTO";

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

const getAllUser = async (page : number, limit : number) => {
    const data = await prisma.user.findMany({
      skip: (page-1) *limit, //skip 몇개를 건너뛸건지
      take : limit //몇개를 재한해서 가져올건지
    });
    return data;
};

const updateUser = async ( userId : number, userUpdateDto : UserUpdateDTO) => {

  const encodedUserUpdateDto : UserUpdateDTO={
    userName : userUpdateDto.userName,
    age : userUpdateDto.age,
    email : userUpdateDto.email
  }

  if(userUpdateDto?.password){//비밀번호를 수정하면 암호화 필요
    const salt = await bcrypt.genSalt(10); 
    const password = await bcrypt.hash(userUpdateDto.password, salt);
    encodedUserUpdateDto.password=password
  }

    const data = await prisma.user.update({
        where:{
            id : userId
        },
        data : {
            ...encodedUserUpdateDto,
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


//* 이름으로 유저 검색(query)
const searchUserByName=async(keyword : string, option : string)=>{

  let data;

  //? 유저 최신순
  if( option ==='desc'){
    data = await prisma.user.findMany({
      where:{
        userName:{
          contains: keyword
        }
      },
      orderBy:{
        createdAt : 'desc'
      }
      
    });// 유저네임에서 키워드를 포함하는 데이터를 싹다 가져옴  

  }
  else if( option ==="asc"){ //?유저 오래된순
    data = await prisma.user.findMany({
      where:{
        userName:{
          contains: keyword
        }
      },
      orderBy:{
        createdAt : 'asc'
      }
    });// 유저네임에서 키워드를 포함하는 데이터를 싹다 가져옴  

  }
  else if(option==="nameAsc"){ //이름 사전순
    data = await prisma.user.findMany({
      where:{
        userName:{
          contains: keyword
        }
      },
      orderBy:{
        userName : 'asc'
      }
    });
  }

  
  return data;
}

const userService = {
    createUser,
    getUserById,
    getAllUser,
    updateUser,
    deleteUser,
    signIn,
    searchUserByName
};

export default userService;