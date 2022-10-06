if(true){
    var test='var !';
    console.log(test);

}

if(true){
    let temp='let!!!';
    console.log(temp);
}
console.log(test);
//console.log(temp); //let은 block scope 이기 때문에 범위밖에서는 정의되지 않음.

function VarIsF_S(){
    var fs='is fs';
    if(true){
        console.log(fs);
    }
    console.log(fs);
}

VarIsF_S();
//console.log(fs); //var 는 함수 스코프이기에 정의된 함수밖에서는 정의되지 않음.



/// ---> var 지.양
