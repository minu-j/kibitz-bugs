import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CameraCard, useCheckUserAuth } from "@/entities/auth";
import { GomokuChatCard } from "@/features/chat";
import { useResetGomoku, gomokuResultState } from "@/entities/game";
import { AspectRatioLayout, Alert, SmallBtn } from "@/shared/ui";
import { GomokuBoard } from "@/widgets/gomoku-board";
import { GomokuTimer, GomokuResult } from "@/features/gameplay";

function Gomoku() {
  useCheckUserAuth();
  const { t } = useTranslation();
  const result = useRecoilValue(gomokuResultState);

  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const resetGomoku = useResetGomoku();

  return (
    <AspectRatioLayout>
      {showAlert ? (
        <Alert
          body={t("pages.gomoku.alert title")}
          onClick={() => {
            resetGomoku();
            navigate("/setting");
          }}
          onCancleClick={() => {
            setShowAlert(false);
          }}
        />
      ) : null}
      <GomokuBoard />
      <aside css={{ width: 380, display: "flex", flexDirection: "column" }}>
        {result ? <GomokuResult /> : <GomokuTimer />}
        <GomokuChatCard />
        <CameraCard played />
        <div css={{ position: "fixed", top: 20, right: 20 }}>
          <SmallBtn
            label={t("pages.gomoku.exit")}
            onClick={() => {
              setShowAlert(true);
            }}
          />
        </div>
      </aside>
    </AspectRatioLayout>
  );
}

export default Gomoku;
