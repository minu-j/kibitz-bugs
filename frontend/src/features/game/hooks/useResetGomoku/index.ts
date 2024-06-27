import { useResetRecoilState } from "recoil";
import {
  gomokuBoardState,
  gomokuRecordState,
  gomokuResultState,
  gomokuTurnState
} from "@/features/game/recoil/gomoku/atoms.ts";

export default function () {
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