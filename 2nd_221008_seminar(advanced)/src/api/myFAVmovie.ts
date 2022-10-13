interface Movie{
    name : string,
    director : string,
    genre : string,
    isGREAT: boolean,
    comment? : string,
}


const myFAVmovie : Movie[]=[{
    name:'헤어질 결심',
    director : '박찬욱',
    genre : 'romance',
    isGREAT : true,
    comment : '박찬욱은 천재다.'
},{
    name:'interstellar',
    director : 'Christopher Nolan',
    genre : 'science fiction',
    isGREAT : true,
    comment : '놀란은 천재다.'
},{
    name:'마션',
    director : '리들리 스콧',
    genre : 'science fiction',
    isGREAT : true,
    comment : "외롭게 감자를 먹고싶다...."
}]

module.exports=myFAVmovie;