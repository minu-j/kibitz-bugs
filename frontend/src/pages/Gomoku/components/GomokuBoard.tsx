import styled from "@emotion/styled";
import GomokuBoardSquare from "./GomokuBoardSquare";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import useInterval from "use-interval";
import target from "@/assets/images/target.svg";
import {
  gomokuBoardState, gomokuNowPlayerState,
  gomokuRecentState,
  gomokuResultState,
  gomokuVoteState
} from "@/features/game/recoil/gomoku/atoms.ts";
import {str2numCoord} from "@/features/game/utils/str2numCoord.ts";

function GomokuBoard() {
  const SQUARE_SIZE: number = 40;

  const board = useRecoilValue(gomokuBoardState);
  const recent = useRecoilValue(gomokuRecentState);
  const result = useRecoilValue(gomokuResultState);
  const vote = useRecoilValue(gomokuVoteState);
  const nowPlayer = useRecoilValue(gomokuNowPlayerState);
  const [voteCount, setVoteCount] = useState<number[][]>(
    new Array(16).fill(null).map(() => new Array(16).fill(0)),
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const [topVote, setTopVote] = useState<number[]>([0, 0]);

  useInterval(() => {
    const newVoteCount: number[][] = new Array(16)
      .fill(null)
      .map(() => new Array(16).fill(0));
    let totalCount: number = 0;
    let newtopVoteCount: number = 0;
    // 시청자 차례일 때
    if (nowPlayer === 2) {
      for (const [key, value] of vote.count.entries()) {
        const [i, j] = str2numCoord(key);
        newVoteCount[i][j] = value;
        totalCount = totalCount + value;
        if (newtopVoteCount < value) {
          newtopVoteCount = value;
          setTopVote(str2numCoord(key));
        }
      }
      setVoteCount(newVoteCount);
      setTotalCount(totalCount);
      // 스트리머 차례일 때
    } else {
      if (topVote[0] || topVote[1]) {
        setTopVote([0, 0]);
        setTotalCount(0);
        setVoteCount(new Array(16).fill(null).map(() => new Array(16).fill(0)));
      }
    }
  }, 500);

  return (
    <StyledGomokuBoard>
      {/* 최고순위 위치 표시 */}
      {nowPlayer === 2 && topVote[0] && topVote[1] && !result ? (
        <div
          css={{
            width: SQUARE_SIZE,
            height: SQUARE_SIZE,
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.3s",
            transform: `translate(
              ${SQUARE_SIZE * topVote[1]}px, 
              ${SQUARE_SIZE * topVote[0]}px)
            `,
          }}
        >
          <img
            src={target}
            css={{
              width: SQUARE_SIZE,
              height: SQUARE_SIZE,
              position: "absolute",
              animation: `breath 1s alternate ease-in-out infinite`,
            }}
          />
        </div>
      ) : null}
      {board.board.map((row, i) =>
        !i ? (
          <div key={`board-sqare-key-${i}`} css={{ display: "flex" }}>
            {row.map((_, j) =>
              !j ? (
                <div
                  key={`board-sqare-key-${i}-${j}`}
                  css={{
                    width: SQUARE_SIZE,
                    height: SQUARE_SIZE,
                  }}
                />
              ) : (
                <div
                  key={`board-sqare-key-${i}-${j}`}
                  css={{
                    width: SQUARE_SIZE,
                    height: SQUARE_SIZE,
                    fontWeight: 900,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 20,
                  }}
                >
                  {alphabet[j]}
                </div>
              ),
            )}
          </div>
        ) : (
          <div key={`board-sqare-key-${i}`} css={{ display: "flex" }}>
            {row.map((col, j) =>
              !j ? (
                <div
                  key={`board-sqare-key-${i}-${j}`}
                  css={{
                    width: SQUARE_SIZE,
                    height: SQUARE_SIZE,
                    fontWeight: 900,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 20,
                  }}
                >
                  {16 - i}
                </div>
              ) : (
                <GomokuBoardSquare
                  key={`board-sqare-key-${i}-${j}`}
                  size={SQUARE_SIZE}
                  i={i}
                  j={j}
                  forbidden={board.forbidden.has(`${i} ${j}`)}
                  stone={col}
                  recent={recent[0] == i && recent[1] == j}
                  voteRate={Math.floor((voteCount[i][j] / totalCount) * 100)}
                />
              ),
            )}
          </div>
        ),
      )}
    </StyledGomokuBoard>
  );
}

export default GomokuBoard;

const StyledGomokuBoard = styled.section`
  width: 720px;
  flex-shrink: 0;
`;

const alphabet = [
  "",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
];
