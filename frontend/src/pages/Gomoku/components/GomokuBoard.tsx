import styled from "@emotion/styled";
import GomokuBoardSquare from "./GomokuBoardSquare";

function GomokuBoard() {
  const BOARD_SIZE: number = 15 + 1;
  const SQUARE_SIZE: number = 44;

  const board: number[][] = new Array(BOARD_SIZE)
    .fill(null)
    .map(() => new Array(BOARD_SIZE).fill(0));

  return (
    <StyledGomokuBoard>
      {board.map((row, i) =>
        !i ? (
          <div css={{ display: "flex" }}>
            {row.map((col, j) =>
              !j ? (
                <div
                  css={{
                    width: SQUARE_SIZE / 2,
                    height: SQUARE_SIZE / 2,
                  }}
                />
              ) : (
                <div
                  css={{
                    width: SQUARE_SIZE,
                    height: SQUARE_SIZE / 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {j}
                </div>
              )
            )}
          </div>
        ) : (
          <div css={{ display: "flex" }}>
            {row.map((col, j) =>
              !j ? (
                <div
                  css={{
                    width: SQUARE_SIZE / 2,
                    height: SQUARE_SIZE,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {i}
                </div>
              ) : (
                <GomokuBoardSquare size={SQUARE_SIZE} stone={0} recent={true} />
              )
            )}
          </div>
        )
      )}
    </StyledGomokuBoard>
  );
}

export default GomokuBoard;

const StyledGomokuBoard = styled.main`
  width: 740px;
  flex-shrink: 0;
`;
