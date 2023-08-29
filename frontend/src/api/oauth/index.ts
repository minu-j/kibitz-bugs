import { authInstance } from "..";
import * as type from "./type";

/**
 * [POST] "token" Access token 요청
 */
export async function getAccessToken(body: type.IAuthorizationBody) {
  return authInstance().post("token", body);
}
