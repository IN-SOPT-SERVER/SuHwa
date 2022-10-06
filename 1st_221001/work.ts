//파트워 소개 코드만들기

// 서버 파트원 2~3명 소개하는 객체 만들기
interface Member{
    name : string,
    age : number,
    address : string,
    favorit:string,
    interest:string,
    univ:string,
    MBTI:string,
}
const members:Member[]=[
    {
        name:'박수린',
        age:21,
        address:'서초 방배',
        favorit:'struggle to buy the MAC BOOK 인데 떡볶이인척',
        interest :'서버',
        univ:'숭실',
        MBTI : 'ISTJ'
    },{
        name : '조 수리수리 예수리',
        age : 24,
        address : '잠실새내역',
        favorit: '고양이',
        interest:'AWS',
        univ:'성신여대',
        MBTI:'ENFP',
    },{
        name : '정준서',
        age : 23,
        address : '잠실새내역',
        favorit: '쌀국수',
        interest: '도커',
        univ: '성신여대',
        MBTI:'ENFP',
    }]


    console.log('두구두구~~~ 저희 줄의 소개를 시작하겠습니다!!! ');
    
    members.map((person:Member):void=>{
        console.log();
        console.log(`안녕하세요 저는 ${person.name}입니다.`);
        console.log(`${person.age}살이고요, MBTI는 ${person.MBTI}에요. 짐작하셨다고요? OK~`);
        console.log(`${person.address}주변에 살고, ${person.univ}에 다니는 중~`);
        console.log(`좋아하는 건 ${person.favorit}이고, 요새는 두그두그`);
        console.log(`       ${person.interest}`);
        console.log('에 관심이 있답니다. 짠~');
        console.log('다음');
        

    })
    console.log('앗 다음이 없네요? 그럼 끝!');
    