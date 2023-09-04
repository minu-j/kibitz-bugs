import styled from "@emotion/styled";
import { Card } from "@components";
import { textStyles } from "@/styles";

function SettingCameraCard() {
  return (
    <StyledSettingCameraCard>
      <Card>
        <div
          css={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            alignItems: "center",
          }}
        >
          <h4
            css={{ ...textStyles.contents }}
          >{`카메라를 여기에 놓아주세요`}</h4>
        </div>
      </Card>
    </StyledSettingCameraCard>
  );
}

export default SettingCameraCard;

const StyledSettingCameraCard = styled.section`
  padding: 8px;
`;
