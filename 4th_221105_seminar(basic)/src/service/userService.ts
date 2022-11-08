import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

const getUserById = async () => {};

const getAllUser = async () => {};

const updateUser = async () => {};

const deleteUser = async () => {};

const userService = {
    createUser,
    getUserById,
    getAllUser,
    updateUser,
    deleteUser,
};

export default userService;