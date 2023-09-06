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
    streamerTime: -1,
    viewerTime: 15,
  },
});

export interface TGomokuBoardState {
  board: number[][];
  forbidden: Set<unknown>;
  finish: Set<unknown>;
}

export const gomokuBoardState = atom<TGomokuBoardState>({
  key: "gomokuBoardState",
  default: {
    board: new Array(16).fill(null).map(() => new Array(16).fill(0)),
    forbidden: new Set(),
    finish: new Set(),
  },
});

export const gomokuResultState = atom<number>({
  key: "gomokuResultState",
  default: 0,
});

export const gomokuRecentState = atom<number[]>({
  key: "gomokuRecentState",
  default: [0, 0],
});

export const gomokuTurnState = atom<1 | 2>({
  key: "gomokuTurnState",
  default: 1,
});

export const gomokuNowPlayerState = atom<1 | 2>({
  key: "gomokuNowPlayerState",
  default: 1,
});

export const gomokuVoteState = atom<{
  count: Map<string, number>;
  total: number;
}>({
  key: "gomokuVoteState",
  default: { count: new Map(), total: 0 },
});

export const gomokuRecordState = atom<string[]>({
  key: "gomokuRecordState",
  default: [""],
});
