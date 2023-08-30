import styled from "@emotion/styled";
import GomokuBoardSquare from "./GomokuBoardSquare";
import { useRecoilState, useSetRecoilState } from "recoil";
import { gomokuBoardState, gomokuTurnState } from "@/recoil/gomoku/atoms";
import { useState } from "react";
import { gomokuPlay } from "@/utils/gomokuPlay";

function GomokuBoard() {
  const SQUARE_SIZE: number = 44;

  const [board, setBoard] = useRecoilState(gomokuBoardState);
  const setTurn = useSetRecoilState(gomokuTurnState);
  const [recent, setRecent] = useState<number[]>([0, 0]);
  const [forbiddenMoves, setForbiddenMoves] = useState<Set<unknown>>(new Set());
  const [finishMoves, setFinishMoves] = useState<Set<unknown>>(new Set());

  const moveStone = (i: number, j: number, stone: 1 | 2) => {
    console.log(i, j, stone);
    if (finishMoves.has(`${i} ${j}`)) {
      setBoard((prevBoard) => {
        const newBoard = JSON.parse(JSON.stringify(prevBoard));
        newBoard[i][j] = stone;
        return newBoard;
      });
      alert("끝");
    } else {
      setBoard((prevBoard) => {
        const newBoard = JSON.parse(JSON.stringify(prevBoard));
        newBoard[i][j] = stone;
        gomokuPlay(newBoard);
        const [newForbiddenMoves, newFinishMoves] = gomokuPlay(newBoard);
        setForbiddenMoves(newForbiddenMoves);
        setFinishMoves(newFinishMoves);
        return newBoard;
      });
      setTurn((prevTurn) => (prevTurn === 1 ? 2 : 1));
      setRecent([i, j]);
    }
  };

  return (
    <StyledGomokuBoard>
      {board.map((row, i) =>
        !i ? (
          <div key={`board-sqare-key-${i}`} css={{ display: "flex" }}>
            {row.map((col, j) =>
              !j ? (
                <div
                  key={`board-sqare-key-${i}-${j}`}
                  css={{
                    width: SQUARE_SIZE / 2,
                    height: SQUARE_SIZE / 2,
                  }}
                />
              ) : (
                <div
                  key={`board-sqare-key-${i}-${j}`}
                  css={{
                    width: SQUARE_SIZE,
                    height: SQUARE_SIZE / 2,
                    fontWeight: 900,
                    display: "flex",
                    justifyContent: "center",
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
                    width: SQUARE_SIZE / 2,
                    height: SQUARE_SIZE,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {i}
                </div>
              ) : (
                <GomokuBoardSquare
                  key={`board-sqare-key-${i}-${j}`}
                  size={SQUARE_SIZE}
                  i={i}
                  j={j}
                  forbidden={forbiddenMoves.has(`${i} ${j}`)}
                  stone={col}
                  recent={recent[0] == i && recent[1] == j}
                  moveStone={moveStone}
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
  width: 740px;
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
