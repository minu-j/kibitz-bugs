export interface TGomokuState {
  streamerColor: 1 | 2;
  viewerColor: 1 | 2;
  streamerTime: number;
  viewerTime: number;
  viewerNickname: string;
}

export interface TGomokuBoardState {
  board: number[][];
  forbidden: Set<unknown>;
  finish: Set<unknown>;
}
