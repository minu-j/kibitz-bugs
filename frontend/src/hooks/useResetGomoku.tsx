import {
  gomokuBoardState,
  gomokuResultState,
  gomokuTurnState,
} from "@/recoil/gomoku/atoms";
import { useResetRecoilState } from "recoil";

function useResetGomoku() {
  const resetGomokuBoardState = useResetRecoilState(gomokuBoardState);
  const resetGomokuTurnState = useResetRecoilState(gomokuTurnState);
  const resetResult = useResetRecoilState(gomokuResultState);

  const useResetGomokuState = () => {
    resetGomokuBoardState();
    resetGomokuTurnState();
    resetResult();
  };

  return useResetGomokuState;
}

export default useResetGomoku;
