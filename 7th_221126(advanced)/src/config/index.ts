import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if(envFound.error){
    throw new Error(".env 파일을 찾을 수 없습니다.");
}

export default {
    port : parseInt(process.env.PORT as string, 10) as number,

    database : process.env.DATABASE_URL as string,

    jwtSecret : process.env.JWT_SECRET as string,
    jwtAlgo : process.env.JWT_ALGO as string,

    s3AccessKey : process.env.S3_ACCESS_KEY as string,
    s3SecretKey : process.env.S3_SECRET_KEY as string,
    bucketName : process.env.S3_BUCKET as string
}