import {
  GomokuBoard,
  GomokuChatCard,
  GomokuInfoCard,
  GomokuResultCard,
} from "./components";
import useCheckUserAuth from "@/hooks/useCheckUserAuth";
import { useRecoilValue } from "recoil";
import { gomokuResultState } from "@/recoil/gomoku/atoms";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useResetGomoku from "@/hooks/useResetGomoku";
import { Alert, AspectRatioLayout, CameraCard, SmallBtn } from "@/components";

function Gomoku() {
  useCheckUserAuth();
  const result = useRecoilValue(gomokuResultState);

  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const resetGomoku = useResetGomoku();

  return (
    <AspectRatioLayout>
      {showAlert ? (
        <Alert
          body="게임 설정으로 돌아가시겠습니까?"
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
            label="종료"
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
