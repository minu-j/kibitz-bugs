import styled from "@emotion/styled";
import GomokuBoardSquare from "./GomokuBoardSquare";
import { useRecoilValue } from "recoil";
import { gomokuBoardState, gomokuRecentState } from "@/recoil/gomoku/atoms";

function GomokuBoard() {
  const SQUARE_SIZE: number = 40;

  const board = useRecoilValue(gomokuBoardState);
  const recent = useRecoilValue(gomokuRecentState);

  return (
    <StyledGomokuBoard>
      {board.board.map((row, i) =>
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
                  forbidden={board.forbidden.has(`${i} ${j}`)}
                  stone={col}
                  recent={recent[0] == i && recent[1] == j}
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
