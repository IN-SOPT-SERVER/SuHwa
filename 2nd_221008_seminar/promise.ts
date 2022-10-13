//pending : 대기 : 비동기 처리가 되지 않은 상태
//fullfilled : 처리완료
//rejected :  처리 실패


const condition:boolean = true;

//최소생성시점
const promise = new Promise((resolve,reject)=>{
    if(condition){
        resolve("우와 promise다");
    }else{
        reject(new Error("비동기 도중 실패"));
    }
});

//비동기 처리성공(then), 비동기 처리 실패(catch)
promise
.then((resolvedData) : void =>{
    console.log(resolvedData);
})
.catch((error):void=>{
    console.error(error);
});
