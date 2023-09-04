import {
  gomokuBoardState,
  gomokuNowPlayerState,
  gomokuRecentState,
  gomokuResultState,
  gomokuTurnState,
} from "@/recoil/gomoku/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { gomokuCore } from "@/utils/gomokuCore";

const useMoveStone = () => {
  const [board, setBoard] = useRecoilState(gomokuBoardState);
  const setTurn = useSetRecoilState(gomokuTurnState);
  const setRecent = useSetRecoilState(gomokuRecentState);
  const turn = useRecoilValue(gomokuTurnState);
  const nowPlayer = useRecoilValue(gomokuNowPlayerState);
  const setResult = useSetRecoilState(gomokuResultState);

  const moveStone = (i: number, j: number, stone: 1 | 2) => {
    setRecent([i, j]);
    if (board.finish.has(`${i} ${j}`)) {
      setBoard((prevBoard) => {
        const newBoard = JSON.parse(JSON.stringify(prevBoard.board));
        newBoard[i][j] = stone;
        return { board: newBoard, forbidden: new Set(), finish: new Set() };
      });
      setResult(nowPlayer);
    } else {
      setBoard((prevBoard) => {
        const newBoard = JSON.parse(JSON.stringify(prevBoard.board));
        newBoard[i][j] = stone;
        const [nextForbiddenMoves, nextFinishMoves] = gomokuCore(
          newBoard,
          turn === 1 ? 2 : 1,
        );
        return {
          board: newBoard,
          forbidden: nextForbiddenMoves,
          finish: nextFinishMoves,
        };
      });
      setTurn((prevTurn) => (prevTurn === 1 ? 2 : 1));
    }
  };
  return moveStone;
};

export default useMoveStone;
