import { GomokuSetting, SettingChatCard, SettingInfoCard } from "./ui";
import { useState } from "react";
import { AspectRatioLayout, CameraCard } from "@/shared/ui";
import Countdown from "@/features/game/components/Countdown.tsx";

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
