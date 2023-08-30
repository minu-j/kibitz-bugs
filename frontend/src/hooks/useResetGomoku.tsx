import { gomokuBoardState, gomokuTurnState } from "@/recoil/gomoku/atoms";
import { useResetRecoilState } from "recoil";

function useResetGomoku() {
  const setGomokuBoardState = useResetRecoilState(gomokuBoardState);
  const setGomokuTurnState = useResetRecoilState(gomokuTurnState);

  const useResetGomokuState = () => {
    setGomokuBoardState();
    setGomokuTurnState();
  };

  return useResetGomokuState;
}

export default useResetGomoku;
