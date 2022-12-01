// src/middlewares/upload.ts

//직접 커스터 추천
import multer from "multer";
import multerS3 from "multer-s3";
import config from "../config";
import s3 from "../config/s3Config";

//멀터를 이용해 실질적인 스토리지는 s3를 사용할것

//? 미들웨어로 사용할 multer 모듈
const upload = multer({
  //? 실질적인 storage 는 multerS3 이용해 aws s3 로 설정
  storage: multerS3({
    s3: s3, //s3 객체를 가져와라
    bucket: config.bucketName, //? s3 bucket name 지정

    //contentType 중요 : auto-content-tpye : memtype 자동으로 설정 : 이걸안하면 이미지를 보는게 아니라 다운받게됨
    contentType: multerS3.AUTO_CONTENT_TYPE, //? mimetype 은 자동으로 설정
    acl: "public-read", // Access control for the file

    //여기 4설정은 s3에 어떤 설정값을 가지고 접근하는지

    //? key는 파일 이름을 지정. 버킷 내 같은 이름의 파일은 같은 파일로 인식하기 때문에 Unique하도록!
    key: function (req: Express.Request, file: Express.MulterS3.File, cb) {
      cb(null, `${Date.now()}_${file.originalname}`); //유니크하도록
    },
  }),
});

export default upload;