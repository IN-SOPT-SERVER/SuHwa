import express, {NextFunction, Request, Response} from "express";

const app=express();
const port=3000;

app.use(express.json())

app.use('/api',require('./api'));

app.listen(port,()=>{
    console.log(`###############################################
     3000번 포트로 듣는 중~~~~!!!!!!!!!!1
    ###################################################`);
    
});