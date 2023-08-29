import { IHeaders, instance } from "..";

/**
 * [GET] "token" Access token 요청
 */
export async function getUsers(headers: IHeaders) {
  return instance(headers).get("users");
}
