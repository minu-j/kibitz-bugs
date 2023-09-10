import { IHeaders, helixInstance } from "..";

/**
 * [GET] "token" Access token 요청
 */
export async function getUsers(headers: IHeaders) {
  return helixInstance(headers).get("users");
}

/**
 * [GET] channel followers 요청
 */
export async function getChannelFollowers(
  headers: IHeaders,
  params: { broadcaster_id: string },
) {
  return helixInstance(headers).get("channels/followers", { params });
}
