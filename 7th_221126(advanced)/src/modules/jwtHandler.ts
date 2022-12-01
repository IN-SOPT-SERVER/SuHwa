//modules : 사소한 도움을 주는 함수들을 모아두는 공간

// src/modules/jwtHandler.ts
import jwt from "jsonwebtoken";
import { tokenType } from "../constants";
import config from "../config";

//* 받아온 userId를 담는 access token 생성
const sign = (userId: number) => {
  const payload = {
    userId,
  };

  //sign 메소드는 첫인자 payload, 두번째 secretkey 세번째 option : 토큰의 유통기한
  const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: "2h" });
  return accessToken;
};

//* token 검사! : 우리가 발급한 토큰이 맞는지?
const verify = (token: string) => {
  let decoded: string | jwt.JwtPayload;

  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch (error: any) {
    if (error.message === "jwt expired") {
      return tokenType.TOKEN_EXPIRED;
    } else if (error.message === "invalid token") {
      return tokenType.TOKEN_INVALID;
    } else {
      return tokenType.TOKEN_INVALID;
    }
  }

  return decoded;
};


export default {
  sign,
  verify,
};