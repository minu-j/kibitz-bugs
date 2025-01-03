import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  gomokuBoardState,
  gomokuNowPlayerState,
  gomokuResultState,
  gomokuVoteState,
  str2numCoord,
} from "@/entities/game";
import { useRecoilValue } from "recoil";
import { useRef } from "react";
import { useChat } from "..";

export type TAddVote = (
  user: string,
  coord: string,
) => "success" | "error" | "normal";

function useChatVote() {
  const votedViewers = useRef(new Set());
  const setVote = useSetRecoilState(gomokuVoteState);

  const board = useRecoilValue(gomokuBoardState);
  const boardRef = useRef(board);
  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  const result = useRecoilValue(gomokuResultState);
  const resultRef = useRef(result);
  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  const nowPlayer = useRecoilValue(gomokuNowPlayerState);
  const nowPlayerRef = useRef(nowPlayer);
  useEffect(() => {
    nowPlayerRef.current = nowPlayer;
    // 시청자 차례로 넘어갈 때 투표된 아이디 초기화
    if (nowPlayer === 2) {
      votedViewers.current.clear();
    }
  }, [nowPlayer]);

  const addVote = (user: string, coord: string) => {
    if (coord && !resultRef.current && nowPlayerRef.current === 2) {
      const [i, j] = str2numCoord(coord);
      // 해당 보드에 돌이 없어야 투표에 반영
      if (
        !boardRef.current.board[i][j] &&
        !boardRef.current.forbidden.has(`${i} ${j}`) &&
        !votedViewers.current.has(user)
      ) {
        setVote((prevVote) => {
          const newCount = prevVote.count;
          if (newCount.has(coord)) {
            newCount.set(coord, newCount.get(coord)! + 1);
          } else {
            newCount.set(coord, 1);
          }
          const newTotal = prevVote.total;
          return { count: newCount, total: newTotal + 1 };
        });
        votedViewers.current.add(user);
        return "success";
      }
      return "error";
    }
    return "normal";
  };

  useChat(addVote);
}

export default useChatVote;
