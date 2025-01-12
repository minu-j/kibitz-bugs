import { instance } from "@/shared/api";

/**
 * [POST] code로 token을 받아오는 요청
 */
export async function postAuthCode(code: string, provider: string) {
  return instance().post(
    "auth/code",
    { code, provider },
    { withCredentials: true },
  );
}

/**
 * [POST] refresh로 token을 받아오는 요청
 */
export async function postAuthRefresh() {
  return instance().post("auth/refresh", {}, { withCredentials: true });
}
