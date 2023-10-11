import { instance } from "..";
import * as type from "./type";

/**
 * [GET] DB 게임 플레이 횟수 데이터 요청
 */
export async function getGameCnt() {
  return instance().get("game/cnt");
}

/**
 * [POST] DB 게임 결과 기록 요청
 */
export async function postGame(body: type.IGameBody) {
  return instance().post("game", body);
}
