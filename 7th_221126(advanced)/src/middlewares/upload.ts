import multerS3 from 'multer-s3';
import multer from "multer";
import config from "../config";
import s3 from "../config/scConfig";
import { Request , Express } from 'express';

const upload = multer({
    storage : multerS3({
        s3 : s3,
        bucket: config.bucketName,
        contentType : multerS3.AUTO_CONTENT_TYPE,
        acl : "public-read",

        key : function(req : Request, file : Express.MulterS3.File , cb){
            cb(null, `${Date.now()}_${file.originalname}`);

        }
    }),
});

export default upload;