import { instance } from "@/shared/api";
import { TUsersByProvider } from "../model";

export interface PostAuthCodeResponse extends TUsersByProvider {}

/**
 * [POST] code로 token을 받아오는 요청
 */
export async function postAuthCode(body: {
  code: string;
  provider: string;
  state?: string;
}) {
  return instance().post<PostAuthCodeResponse>("auth/code", body, {
    withCredentials: true,
  });
}

/**
 * [POST] refresh로 token을 받아오는 요청
 */
export async function postAuthRefresh() {
  return instance().post<PostAuthCodeResponse>(
    "auth/refresh",
    {},
    {
      withCredentials: true,
    },
  );
}

/**
 * [POST] 로그아웃 요청
 */
export async function postAuthLogout(body: { provider: string }) {
  return instance().post("auth/logout", body, {
    withCredentials: true,
  });
}
