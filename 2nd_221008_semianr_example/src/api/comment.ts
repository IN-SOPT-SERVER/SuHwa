import express, {NextFunction, Request, Response, Router } from "express";

const router : Router = express.Router();

const myFAVmovie=require('./myFAVmovie');

const Comment : String[] = myFAVmovie.map((f : any)=>{
    return f.comment
})

console.log(Comment);



router.use("/",(req : Request, res : Response)=>{
    return res.status(200).json({
        status : 200,
        data : Comment
    });

});

module.exports=router;