import {
  gomokuBoardState,
  gomokuFinishMovesState,
  gomokuForbiddenMovesState,
  gomokuRecentState,
  gomokuTurnState,
} from "@/recoil/gomoku/atoms";
import { gomokuPlay } from "@/utils/gomokuPlay";
import { useRecoilState, useSetRecoilState } from "recoil";

const useMoveStone = () => {
  const setBoard = useSetRecoilState(gomokuBoardState);
  const setTurn = useSetRecoilState(gomokuTurnState);
  const setRecent = useSetRecoilState(gomokuRecentState);
  const setForbiddenMoves = useSetRecoilState(gomokuForbiddenMovesState);
  const [finishMoves, setFinishMoves] = useRecoilState(gomokuFinishMovesState);

  const moveStone = (i: number, j: number, stone: 1 | 2) => {
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
        const [newForbiddenMoves, newFinishMoves] = gomokuPlay(newBoard);
        // setForbiddenMoves(newForbiddenMoves);
        // setFinishMoves(newFinishMoves);
        return newBoard;
      });
      setTurn((prevTurn) => (prevTurn === 1 ? 2 : 1));
      setRecent([i, j]);
    }
  };
  return moveStone;
};

export default useMoveStone;
