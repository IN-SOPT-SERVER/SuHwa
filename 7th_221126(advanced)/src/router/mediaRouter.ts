import { Router, Request, Response, NextFunction } from "express";
import { mediaController } from '../controller';
import { auth } from "../middlewares";
import upload from "../middlewares/upload";
import { body } from "express-validator";

const mediaRouter : Router = Router();
//CRUD

//C : 넷플릭에 미디어 컨텐츠 추가
mediaRouter.post("/", auth, upload.single('thumbnail')
,
[
    body("title","제목이 없습니다.").notEmpty(),
    body("length","미디어의 길이가 없거나 숫자가 아닙니다.").notEmpty().isNumeric(),
    body("quality","화질을 적어주세요.").notEmpty(),
    body("seriesNum","시리즈개수가 없거나 숫자가 아닙니다.").notEmpty().isNumeric(),
    body("createYear","개봉년도가 없거나 숫자가 아닙니다.").notEmpty().isNumeric(),
    body("genre","장르를 적어주세요.").notEmpty(),
    body("character","특징을 적어주세요.").notEmpty(),
    body("summary","요약을 적어주세요.").notEmpty()
], mediaController.createMedia);
//R
// 전체 미디어 목록 조회
mediaRouter.get("/", auth, mediaController.getAllMedia);

// 미디어 목록 하나조회 - detail
mediaRouter.get("/:mediaId/detail", auth, mediaController.getMediaDetail);

// U : 미디어 컨텐츠 정보 변경
mediaRouter.patch("/:mediaId", auth, mediaController.updateMedia);

// D : 미디어 정보 삭제
mediaRouter.delete("/:mediaId",auth, mediaController.deleteMedia);





export default mediaRouter;
