//var를 사용한 변수

var TheCutiestDog='Bori';
console.log(TheCutiestDog);

//var로 선언하면 재할당 가능
TheCutiestDog='(아이)보리';
console.log(TheCutiestDog);


//let을 사용한 변수

let myName='유수화';
console.log(myName);
//let은 재할당은 가능하지만 재선언은 불가능
myName='Suhwa Yu'
//let myName='ddd';
console.log(myName);



//const(상수) : immutable(수정불가능!) : 재할당, 재선언 다 불가능
const mySister='SuJi Yu';

//mySister='유수지';
//const mySister='Bori?';


let N=null;
let M=undefined;

console.log(typeof N);
console.log(typeof M);

if(N==M){
    console.log('N==M');
}
if(N===M){
    console.log(('N===M'));
}




const fav_arr=['유수화','보리',23,false];
const arr2=Array('wiw','cow',44);

arr2.map((data)=>{
    console.log(data);
});

fav_arr.map((data)=>{
    console.log(`내가 좋아하는 것들~ 은? ${data}이다.!`);
});



let six=6
let st='hey'

console.log(typeof six === Number)
console.log(typeof Number(six) === Number)

if(String instanceof Object){
    console.log("JS에서는 모든것이 객체이다.");
}else{
    console.log("아닌것도 있나봐;;");
}

console.log(Number.prototype);
console.log(six.prototype);
console.log(st.prototype);

console.log(Object.prototype.toString.call('')); // [object String]
console.log(Object.prototype.toString.call(1)); // [object Number]
console.log(Object.prototype.toString.call(true)); // [object Boolean]
console.log(Object.prototype.toString.call(Symbol('symbol'))); // [object Symbol]
console.log(Object.prototype.toString.call(BigInt(1e10))); // [object BigInt]
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call({})); // [object Object]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]



let date=new Date(); //현재 날짜와 시간을 가지는 객체

console.log('현재는 date 입니다'); //현재는 date 입니다.
console.log('현재는 '+ date.toDateString()+' 입니다');
console.log(typeof date);
console.log('현재는 %s 입니다',date.toDateString());
console.log('%f',0.003);
console.log('%d',0.0004);