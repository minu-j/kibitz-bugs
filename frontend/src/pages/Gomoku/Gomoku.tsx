import styled from "@emotion/styled";
import {
  GomokuBoard,
  GomokuCameraCard,
  GomokuChatCard,
  GomokuInfoCard,
  GomokuResultCard,
} from "./components";
import useCheckUserAuth from "@/hooks/useCheckUserAuth";
import { useRecoilValue } from "recoil";
import { gomokuResultState } from "@/recoil/gomoku/atoms";

function Gomoku() {
  useCheckUserAuth();
  const result = useRecoilValue(gomokuResultState);

  return (
    <StyledGomoku>
      <GomokuBoard />
      <div css={{ width: 380, display: "flex", flexDirection: "column" }}>
        {result ? <GomokuResultCard /> : <GomokuInfoCard />}
        <GomokuChatCard />
        <GomokuCameraCard />
      </div>
    </StyledGomoku>
  );
}

export default Gomoku;

const StyledGomoku = styled.main`
  padding: 44px 80px;
  width: 1280px;
  height: 720px;
  display: flex;
`;
