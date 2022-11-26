import { ImageCreateResponseDTO } from './../interfaces/image/ImageCreateResponseDTO';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//* 이미지 업로드

const uploadImage = async(location: string) : Promise<ImageCreateResponseDTO|null> => {
    const data = await prisma.image.create({
        data:{
            image : location
        }
    });

    const result : ImageCreateResponseDTO={
        id : data.Id,
        image : data.image as string,
    }

    return result;


}

const imageService={
    uploadImage
}

export default imageService;
