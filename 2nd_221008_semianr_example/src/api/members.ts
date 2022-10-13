import express, {NextFunction, Request, Response, Router } from "express";

const router : Router = express.Router();

interface SOPT{
    name : string,
    age : number,
    isSOPT : boolean,
    favorite : any,
    favorFood : string,
    cat ?: boolean, //?로 선택적 속성을 나타냄
}

//인터페이스에서 정한대로 속성과 타입을 모두 갖춰야함
//인터페이스를 클래스와 변수에 적용한 예
const intro : SOPT={
    name: 'Suhwa',
    age : 23,
    isSOPT : true,
    favorFood : '샵샵',
    favorite:5
}

//interface를 함수에 적용
function MakeSopt(yb : object):SOPT{
    let BB:SOPT={
        name : 'c',
        age : 3,
        isSOPT : true,
        favorite : 'aa',
        favorFood : 'aa'
    };
    return BB;

}

//interface를 변수에 적용
let me : SOPT;

const introduce:SOPT[]=[{
    name:'ww',
    age:2,
    isSOPT : false,
    favorFood: 'sushi',
    favorite : 'hi',
    cat : true
},{
    name:'빛',
    age:24,
    isSOPT : true,
    favorFood: '부찌',
    favorite : 'shwa'
},{
    name:'bori',
    age:5,
    isSOPT : false,
    favorFood: 'salmon',
    favorite : 'walk out'
}]


router.use("/",(req: Request, res : Response)=>{
    /*return res.status(200).json({
        status : 200,
        data : introduce,
    });*/
    return res.status(200).json(JSON.stringify(introduce));
});

module.exports=router;