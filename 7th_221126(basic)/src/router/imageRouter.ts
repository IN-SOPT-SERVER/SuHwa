import { Router } from "express";
import upload from "../middlewares/upload";
import imageController from "../controller/imageController";

const imageRouter : Router = Router();

imageRouter.post("/",upload.single('file'),imageController.uploadImage);


export default imageRouter;