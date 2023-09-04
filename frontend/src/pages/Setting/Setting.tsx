import styled from "@emotion/styled";
import {
  GomokuSetting,
  SettingCameraCard,
  SettingChatCard,
  SettingInfoCard,
} from "./components";

function Setting() {
  return (
    <StyledSetting>
      <GomokuSetting />
      <div css={{ width: 420, display: "flex", flexDirection: "column" }}>
        <SettingInfoCard />
        <SettingChatCard />
        <SettingCameraCard />
      </div>
    </StyledSetting>
  );
}

export default Setting;

const StyledSetting = styled.main`
  padding: 16px 60px;
  width: 1280px;
  height: 720px;
  display: flex;
`;
