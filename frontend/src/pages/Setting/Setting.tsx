import { GomokuSetting, SettingChatCard, SettingInfoCard } from "./components";
import { useState } from "react";
import {AspectRatioLayout} from "@/components/layout";
import Countdown from "@/features/game/components/Countdown.tsx";
import {CameraCard} from "@/components/card";

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
