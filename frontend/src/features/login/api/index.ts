import { instance } from "@/shared/api";

/**
 * [GET] DB 로그인 횟수 데이터 요청
 */
export async function getLoginCnt() {
  return instance().get("login/cnt");
}
