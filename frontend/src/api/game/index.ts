import { instance } from "..";
import * as type from "./type";

/**
 * [POST] DB 게임 결과 기록 요청
 */
export async function postGame(body: type.IGameBody) {
  return instance().post("api/v1/game", body);
}
