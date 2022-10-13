import express, { Request, Response, Router } from "express";

const router : Router =express.Router();

router.use("/user",require('./user'));

router.use('/',(req,res)=>{
    return res.status(201).json({message : "이거 되나요?"})
})

module.exports=router;