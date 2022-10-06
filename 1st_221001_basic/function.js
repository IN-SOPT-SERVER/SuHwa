//함수선언식(호이스팅의 영향받음)
function hello(name){
    console.log(`${name}아 안녕?`);

}

hello('솨');

//함수 표현식(호이스팅 영향안받음)
const sum=(num1,num2)=>{
    const result=num1+num2;
    console.log(result);
};

sum(6,7);