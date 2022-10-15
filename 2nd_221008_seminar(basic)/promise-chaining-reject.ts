Promise.resolve(true)
  .then((response) => {
    throw new Error("비동기 처리 중 에러 발생!");
  })
  .then((response) => {
    console.log(response+"then 으로 받았어!");
    return Promise.resolve(true);
  })
  .catch((error) => {
    console.error(error);
  })
  /*.catch((error) => { //eror 처리는 앞선 catch에서 해줘서 필요없음.
    console.error(error);
    
  })*/;
  