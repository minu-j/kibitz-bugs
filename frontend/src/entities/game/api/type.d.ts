/**
 * DB 게임 결과 기록 body
 */
export interface IGameBody {
  id: string;
  name: string;
  nickname: string;
  imgUrl: string;
  win: boolean;
}
