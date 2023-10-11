import { instance } from "..";

/**
 * [POST] code로 token을 받아오는 요청
 */
export async function postAuthCode(code: string) {
  return instance().post("auth/code", { code: code });
}

/**
 * [POST] refresh로 token을 받아오는 요청
 */
export async function postAuthRefresh() {
  return instance().post("auth/refresh");
}
