import { Request, Response } from "express";
import { imageService } from "../service";
import { sc, rm } from "../constants";
import { fail, success } from "../constants/response";




const uploadImage = async (req : Request, res : Response) => {

    const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
    const { location } = image;


    if (!location){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_IMAGE));
    }


    const uploadedImage = await imageService.uploadImage(location);

    if(!uploadedImage){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CREATE_IMAGE_FAIL));

    }

    return res.status(sc.CREATED).send(success(sc.CREATED,rm.CREATE_IMAGE_SUCCESS,uploadedImage));


}

const imageController={
    uploadImage,
}

export default imageController;