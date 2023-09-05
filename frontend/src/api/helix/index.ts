import { IHeaders, helixInstance } from "..";

/**
 * [GET] "token" Access token 요청
 */
export async function getUsers(headers: IHeaders) {
  return helixInstance(headers).get("users");
}
