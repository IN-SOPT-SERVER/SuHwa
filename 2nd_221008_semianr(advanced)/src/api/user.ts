import express, {NextFunction, Request, Response, Router } from "express";

const router : Router = express.Router();

router.use("/",(req : Request, res : Response)=>{
    return res.status(200).json({
        status : 200,
        message : "유저조회 성공?!"
    });

});

module.exports=router;