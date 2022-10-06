

const a:string='hello';
console.log(typeof a, a);

const b:number=3;
console.log(typeof b,b);

const c : boolean=true;
console.log(typeof c, c);

//const d : string=5; //error

let aaa:string []=['a','b'];

const bbb : Array<number> = [1,4,6,855,44,3];


//ts에서 Object object
const ccc : Object[]=['sdfdf',{hey:4}]//?왜 js는 원시타입도 객체로 생각하지? -> 자스가 객체지향이니까?
const ddd : object[]=[['sdfd'],{},{kkk:'kk?'},[]] 


const foo1=(a:Object):void => {
    console.log(a);
    
}

const foo2=(b:object):void => {
    console.log(b);
    
}

foo1('boom');
//foo2('boomm'); //object 에는 원시타입인 string이 포함되지 않는다



//함수의 반환타입 명시
const hi = (name: string) : void => {
    console.log(`hi~ &{name}`);
    
};

const ss= (a: number, b: number): number => {
    return a + b;
}

let n : null =null;
//n=2;
let u : undefined=undefined;
//u='wow';
//자바스크립트의 원시타입중 null과 undefined 타입이 존재함으로(출처) 타입스크립트에도 null, undefined는 타입으로서 존재(즉 null 로 정의된 변수에 다른 타입의 값 할당 불가능)

//타입 단언

//as
const A: any='솨솨솨'; //any로 지정해둬서 타스는 정확히 어떤 타입인지 모름...
console.log(typeof A);//string
const nameLength = (A as string).length //as 를 이용하여 어떤 타입인지 ㅏㄹ려줌
console.log(typeof A);//string

console.log(nameLength);


//angle-bracket
const B:any='후후후';
console.log(typeof B);//string
const NameLength=(<string>B).length;
console.log(NameLength);
console.log(typeof B);//string

//변수를 any로 할당하면, 재할당시에 타입을 바꾸어 넣을수도 있다.
let C : any = [];
console.log(typeof C); //정의시 any이지만, 할당은 배열이 되었기에 타입을 출력하면 배열의 타입인 object가 나온다.
console.log(C.length); //타입스크립트는 인터프리터인가? any로 정의해서 실행되기전까지는 슈뢰딩거의 메소드처럼.... 모를텐데 어찌 잘 실행되었네?
C=5;
console.log(typeof C); // 재할당으로 다른 타입을 넣으면, 타입출력시 할당된 숫자의 타입이 출력된다.



