// 스프레드(...) 연산자를 이용해 그대로 뿌려줘야하기때문에 db의 column 명과 동일한 필드명 사용
export interface UserUpdateDTO{
    userName?: string;
    age?: number;
    email?: string;
    password?: string;

}

