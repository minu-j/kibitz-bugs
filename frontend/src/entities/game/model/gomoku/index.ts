import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { TGomokuBoardState, TGomokuState } from "./type";

const { persistAtom } = recoilPersist();

const gomokuState = atom<TGomokuState>({
  key: "gomokuState",
  default: {
    streamerColor: 1,
    viewerColor: 2,
    streamerTime: -1,
    viewerTime: 15,
  },
  effects_UNSTABLE: [persistAtom],
});

const gomokuBoardState = atom<TGomokuBoardState>({
  key: "gomokuBoardState",
  default: {
    board: new Array(16).fill(null).map(() => new Array(16).fill(0)),
    forbidden: new Set(),
    finish: new Set(),
  },
});

const gomokuResultState = atom<number>({
  key: "gomokuResultState",
  default: 0,
});

const gomokuRecentState = atom<number[]>({
  key: "gomokuRecentState",
  default: [0, 0],
});

const gomokuTurnState = atom<1 | 2>({
  key: "gomokuTurnState",
  default: 1,
});

const gomokuNowPlayerState = atom<1 | 2>({
  key: "gomokuNowPlayerState",
  default: 1,
});

const gomokuVoteState = atom<{
  count: Map<string, number>;
  total: number;
}>({
  key: "gomokuVoteState",
  default: { count: new Map(), total: 0 },
});

const gomokuRecordState = atom<string[]>({
  key: "gomokuRecordState",
  default: [""],
});

export {
  gomokuState,
  gomokuBoardState,
  gomokuResultState,
  gomokuRecentState,
  gomokuTurnState,
  gomokuNowPlayerState,
  gomokuVoteState,
  gomokuRecordState,
};
