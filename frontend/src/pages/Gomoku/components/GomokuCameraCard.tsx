import styled from "@emotion/styled";
import { Card } from "../../../components";

function GomokuCameraCard() {
  return (
    <StyledGomokuCameraCard>
      <Card>
        <div>카메라 요기</div>
      </Card>
    </StyledGomokuCameraCard>
  );
}

export default GomokuCameraCard;

const StyledGomokuCameraCard = styled.main`
  padding: 8px;
`;
