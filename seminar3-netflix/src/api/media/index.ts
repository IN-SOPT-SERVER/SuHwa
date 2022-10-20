import express, {  Request, Response, Router } from "express";
import { detailRouter } from "./detail";

export const mediaRouter : Router = express.Router();

mediaRouter.get("/",(req : Request, res : Response)=>{
    return res.send("어느작품을 볼건지? 아마 메인페이지가 있을듯?")
});

//mediaRouter.get("/:mediaId/detail", detailRouter);
mediaRouter.get("/detail", detailRouter);



