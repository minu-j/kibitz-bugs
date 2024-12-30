import { instance } from "@/shared/api";
import { IGameBody } from "./type";

/**
 * [GET] DB 게임 플레이 횟수 데이터 요청
 */
export async function getGameCnt() {
  return instance().get("game/cnt");
}

/**
 * [POST] DB 게임 결과 기록 요청
 */
export async function postGame(body: IGameBody) {
  return instance().post("game", body);
}
