import styled from "@emotion/styled";
import {
  GomokuSetting,
  SettingCameraCard,
  SettingChatCard,
  SettingInfoCard,
} from "./components";
import { useState } from "react";
import { Countdown } from "@/components";

function Setting() {
  const [showCount, setShowCount] = useState<boolean>(false);

  return (
    <StyledSetting>
      {showCount ? (
        <Countdown />
      ) : (
        <GomokuSetting onClick={() => setShowCount(true)} />
      )}
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
