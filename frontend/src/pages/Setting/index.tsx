import { GomokuSetting, SettingInfoCard } from "./ui";
import { useState } from "react";
import { AspectRatioLayout } from "@/shared/ui";
import { Countdown } from "@/entities/game";
import { CameraCard } from "@/entities/auth";
import GomokuChatCard from "@/features/chat/ui/GomokuChatCard";

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
        <GomokuChatCard />
        <CameraCard />
      </aside>
    </AspectRatioLayout>
  );
}

export default Setting;
