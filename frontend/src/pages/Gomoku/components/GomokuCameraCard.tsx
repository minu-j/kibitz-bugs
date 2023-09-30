import styled from "@emotion/styled";
import { Alert, Card, SmallBtn } from "@components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useResetGomoku from "@/hooks/useResetGomoku";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/user/atoms";

function GomokuCameraCard() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const resetGomoku = useResetGomoku();
  const user = useRecoilValue(userState);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen)
        return document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) return document.exitFullscreen();
    }
  };

  return (
    <StyledGomokuCameraCard>
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
          <img css={{ width: 80, borderRadius: "100%" }} src={user.imgUrl} />
          <div
            css={{
              top: 16,
              right: 16,
              position: "absolute",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: 8,
            }}
          >
            <SmallBtn
              label="나가기"
              onClick={() => {
                setShowAlert(true);
              }}
            ></SmallBtn>
            <SmallBtn
              label={document.fullscreenElement ? "창 모드" : "전체화면"}
              onClick={toggleFullScreen}
            ></SmallBtn>
          </div>
        </div>
      </Card>
    </StyledGomokuCameraCard>
  );
}

export default GomokuCameraCard;

const StyledGomokuCameraCard = styled.section`
  padding: 8px;
`;
