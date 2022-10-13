import express, {NextFunction, Request, Response, Router } from "express";

const router : Router = express.Router();

interface Movie{
    name : string,
    director : string,
    genre : string,
    isGREAT: boolean,
    comment? : string,
}


const myFAVmovie = require('./myFAVmovie');



router.use("/",(req : Request, res : Response)=>{
    return res.status(200).json({
        status : 200,
        data : myFAVmovie,
    });

});

module.exports=router;