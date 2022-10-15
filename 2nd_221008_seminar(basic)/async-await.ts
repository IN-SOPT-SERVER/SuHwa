let asyncFunc1 = (something : string): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(`resolve ${something} from func1...`)
        },1000);
    });
}

let asyncFunc2 = async (something : string) => {
    something = await asyncFunc1(something);
    //return something;
    /*setTimeout(()=>{ // async를 붙여준다고 안의 비동기 코드가 동기적으로 동작하지 않음.
        // await를 통해서만 동기적 동작 지시 가능
            return `async ${something} from func2...`;
        },1500);*/
    return `async ${something} from func2...`; 
    
};






const main = async (): Promise<void> => {
    let result = await asyncFunc1("wow");
    console.log(result);
    let result2 = await asyncFunc2("holy moly");
    console.log(result2);
    
}

main();