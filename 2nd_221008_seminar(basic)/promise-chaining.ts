//아침에 힘들게 일어나는 나.....
const me = (callback : ()=> void, time : number )=>{
    setTimeout(callback, time);
};

//기상
const wakeUp = () : Promise<string> => {
    return new Promise((resolve, reject)=>{
        me(()=>{
            console.log("[현재] 일어남");
            resolve("일어남");
        }, 1000 );
    });
};

//화장실 감
const goBathRoom = (now : string) : Promise<string> => {
    return new Promise((resolve, reject)=>{
        me(()=>{
            console.log("[현재] 화장실로 이동");
            resolve(`${now}-> 화장실로 이동`);
        }, 1000 );
    });
};

//칫솔과 치약을 준비
const ready = (now : string) : Promise<string> => {
    return new Promise((resolve, reject)=>{
        me(()=>{
            console.log("[현재] 칫솔과 치약을 준비");
            resolve(`${now}-> 칫솔고 치약을 준비`);
        }, 1000 );
    });
};




//양치함
const startChikaChika = (now : string) : Promise<string> => {
    return new Promise((resolve, reject)=>{
        me(()=>{
            console.log("[현재] 양치함");
            resolve(`${now}-> 양치함`);
        }, 1000 );
    });
};


//난 자신에게 칭찬함
const goodJob = (now : string) : Promise<string> => {
    return new Promise((resolve, reject)=>{
        me(()=>{
            console.log("[현재] 자신을 칭찬");
            resolve(`${now}-> 칭찬`);
        }, 1000 );
    });
};

wakeUp()
.then((now)=>goBathRoom(now))
.then((now)=>ready(now))
.then((now)=>startChikaChika(now))
.then((now)=>goodJob(now))
.then((now)=>console.log(`\n${now}`));