import { Prisma } from '@prisma/client';
import { UserLogInDTO } from './../interface/user/UserLonInDTO';
import  bcrypt  from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { UserCreateDTO } from '../interface/user/UserCreateDTO';
import { sc } from '../constants';


const prisma = new PrismaClient;

const createUser = async(userCreateDto : UserCreateDTO) : Promise<object|null>=>{
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userCreateDto.password, salt);

    const data = await prisma.user.create({
        data:{
            userName : userCreateDto.name,
            age : userCreateDto.age,
            email : userCreateDto.email,
            password
        },
    });

    return data;
}

const logInUser = async(userLogInDto : UserLogInDTO) : Promise<string|number|null>=>{
    try{
        const loginUser = await prisma.user.findFirst({
            where:{
                email : userLogInDto.email,
            }
        });
        if(!loginUser) return null;

        const isMatch = await bcrypt.compare(userLogInDto.password,loginUser.password);
        if(!isMatch) return sc.UNAUTHORIZED;

        return loginUser.id;

    }
    catch(error){
        console.log(error);
        throw error;
        
    }
}


const userService={
    createUser,
    logInUser
}

export default userService;