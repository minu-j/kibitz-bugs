import {
  GomokuBoard,
  GomokuChatCard,
  GomokuInfoCard,
  GomokuResultCard,
} from "./ui";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCheckUserAuth } from "@/features/auth/hooks";
import { gomokuResultState } from "@/features/game/recoil/gomoku/atoms.ts";
import { useResetGomoku } from "@/features/game/hooks";
import { AspectRatioLayout, Alert, CameraCard, SmallBtn } from "@/shared/ui";

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
        {result ? <GomokuResultCard /> : <GomokuInfoCard />}
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
