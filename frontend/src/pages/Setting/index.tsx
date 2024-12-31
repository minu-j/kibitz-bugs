import { GomokuSetting, SettingChatCard, SettingInfoCard } from "./ui";
import { useState } from "react";
import { AspectRatioLayout } from "@/shared/ui";
import { Countdown } from "@/entities/game";
import { CameraCard } from "@/entities/auth";

function Setting() {
  const [showCount, setShowCount] = useState<boolean>(false);

  return (
    <AspectRatioLayout>
      {showCount ? (
        <Countdown />
      ) : (
        <GomokuSetting onClick={() => setShowCount(true)} />
      )}
      <aside css={{ width: 380, display: "flex", flexDirection: "column" }}>
        <SettingInfoCard />
        <SettingChatCard />
        <CameraCard />
      </aside>
    </AspectRatioLayout>
  );
}

export default Setting;
