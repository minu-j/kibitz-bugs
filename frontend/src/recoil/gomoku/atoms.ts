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
    viewerTime: 50,
  },
});

export const gomokuBoardState = atom<number[][]>({
  key: "gomokuBoardState",
  default: new Array(16).fill(null).map(() => new Array(16).fill(0)),
});

export const gomokuRecentState = atom<number[]>({
  key: "gomokuRecentState",
  default: [0, 0],
});

export const gomokuForbiddenMovesState = atom<Set<unknown>>({
  key: "gomokuForbiddenMovesState",
  default: new Set(),
});

export const gomokuFinishMovesState = atom<Set<unknown>>({
  key: "gomokuFinishMovesState",
  default: new Set(),
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
