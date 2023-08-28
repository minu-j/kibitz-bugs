import styled from "@emotion/styled";
import GomokuBoard from "./components/GomokuBoard";
import GomokuCameraCard from "./components/GomokuCameraCard";
import GomokuChatCard from "./components/GomokuChatCard";
import GomokuInfoCard from "./components/GomokuInfoCard";

function Gomoku() {
  return (
    <StyledGomoku>
      <GomokuBoard />
      <div css={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <GomokuInfoCard></GomokuInfoCard>
        <GomokuChatCard></GomokuChatCard>
        <GomokuCameraCard></GomokuCameraCard>
      </div>
    </StyledGomoku>
  );
}

export default Gomoku;

const StyledGomoku = styled.main`
  padding: 16px 64px;
  width: 1280px;
  height: 720px;
  display: flex;
`;
