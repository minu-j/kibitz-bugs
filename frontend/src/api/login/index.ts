import { instance } from "..";
import * as type from "./type";

/**
 * [GET] DB 로그인 횟수 데이터 요청
 */
export async function getLoginCnt() {
  return instance().get("login/cnt");
}

/**
 * [POST] DB login 기록 요청
 */
export async function postLogin(body: type.ILoginBody) {
  return instance().post("login", body);
}
