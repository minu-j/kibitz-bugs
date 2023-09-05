import { instance } from "..";
import * as type from "./type";

/**
 * [POST] DB login 기록 요청
 */
export async function postLogin(body: type.ILoginBody) {
  return instance().post("api/v1/login", body);
}
