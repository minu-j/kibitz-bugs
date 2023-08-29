import styled from "@emotion/styled";
import {
  GomokuBoard,
  GomokuCameraCard,
  GomokuChatCard,
  GomokuInfoCard,
} from "./components";

function Gomoku() {
  return (
    <StyledGomoku>
      <GomokuBoard />
      <div css={{ width: 420, display: "flex", flexDirection: "column" }}>
        <GomokuInfoCard />
        <GomokuChatCard />
        <GomokuCameraCard />
      </div>
    </StyledGomoku>
  );
}

export default Gomoku;

const StyledGomoku = styled.main`
  padding: 16px 60px;
  width: 1280px;
  height: 720px;
  display: flex;
`;
