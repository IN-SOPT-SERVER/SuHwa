/* 
도전 과제 조건
1. Member, Dinner interface 만들고 타입 지정하기
2. organize 내부 로직 채우기
*/


interface Member{
    name : string,
    age : number,
    group : string,
}

interface Menu{
    type : string,
    restaurant : string,
    name : string ,
    loaction : string ,
    price : number,

}

interface Dinner{
    member : Member[],
    menu : Menu[],
    shuffle(arry : object[]) : object[],
    organize() : void
        
    
}




const dinner = {
    member : [
        {
            name: "권세훈",
            age : 24,
            group: "ob",
          },
          {
            name : "김소현",
            age : 23,
            group: "ob",
          },
          {
            name: "양지영",
            age : 24,
            group : "yb(ob같은 와비)"
          },
          {
            name: "유수화",
            age : 23,
            group : "yb"
          },
          {
            name: "장한빛",
            age : 24,
            group : "yb"
          },
          {
            name: "박수린",
            age : 22,
            group : "yb"
          }
    ],
    menu : [
        {
            type : "salad",
            restaurant : "알라보",
            name : "Asian chicken salad",
            location : "Seoul Station",
            price : 14000 
        },
        {
            type : "Korean",
            restaurant : "정겨운 밥상",
            name : "부대 찌개",
            location : "Sookmyung Women's Univ. Station",
            price : 16000
        },
        {
            type : "Italian",
            restaurant : "민중의 파스타",
            name : "해장 파스타",
            location : "Sookmyung Women's Univ. Station",
            price : 14000
        }
    ],
    shuffle(array : Array<object>) : Array<object> {
      array.sort(() => Math.random() - 0.5);
      return array;
    },
    organize() : void {
        let dinnerMember : object[] = this.shuffle(this.member);        
        let dinnerMenu : object[] = this.shuffle(this.menu);
        
        for(let i : number =0 ; i < dinnerMember.length ; i+=2){
            console.log(`짝 ${i/2+1} : ${(dinnerMember[i] as Member).name} | ${(dinnerMember[i+1] as Member).name}, 메뉴 : ${(dinnerMenu[i/2] as Menu).name}`);
            
        }
      
    },
  };
  

dinner.organize()