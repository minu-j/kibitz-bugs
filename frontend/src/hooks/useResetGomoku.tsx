import {
  gomokuBoardState,
  gomokuRecordState,
  gomokuResultState,
  gomokuTurnState,
} from "@/recoil/gomoku/atoms";
import { useResetRecoilState } from "recoil";

function useResetGomoku() {
  const resetGomokuBoardState = useResetRecoilState(gomokuBoardState);
  const resetGomokuTurnState = useResetRecoilState(gomokuTurnState);
  const resetResult = useResetRecoilState(gomokuResultState);
  const resetRecord = useResetRecoilState(gomokuRecordState);

  const useResetGomokuState = () => {
    resetGomokuBoardState();
    resetGomokuTurnState();
    resetResult();
    resetRecord();
  };

  return useResetGomokuState;
}

export default useResetGomoku;
