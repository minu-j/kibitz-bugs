import styled from "@emotion/styled";
import { Card } from "../../../components";

function GomokuChatCard() {
  return (
    <StyledGomokuChatCard>
      <Card>
        <div>채팅 요기</div>
      </Card>
    </StyledGomokuChatCard>
  );
}

export default GomokuChatCard;

const StyledGomokuChatCard = styled.main`
  padding: 8px;
`;
