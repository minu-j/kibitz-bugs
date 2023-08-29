import { atom } from "recoil";

export interface TGomokuState {
  streamerColor: 1 | 2;
  viewerColor: 1 | 2;
  streamerTime: number;
  viewerTime: number;
}

export const gomokuState = atom<TGomokuState>({
  key: "gomokuState",
  default: {
    streamerColor: 1,
    viewerColor: 2,
    streamerTime: 0,
    viewerTime: 5000,
  },
});

export const gomokuBoardState = atom<number[][]>({
  key: "gomokuBoardState",
  default: new Array(16).fill(null).map(() => new Array(16).fill(0)),
});

export const gomokuTurnState = atom<1 | 2>({
  key: "gomokuTurnState",
  default: 1,
});
