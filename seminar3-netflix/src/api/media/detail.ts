import express, {  Request, Response, Router } from "express";

export const detailRouter : Router = express.Router();

detailRouter.get("/", (req : Request, res : Response )=>{
    return res.send("ho");

});