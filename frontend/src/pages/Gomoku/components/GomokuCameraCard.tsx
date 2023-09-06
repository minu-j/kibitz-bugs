import styled from "@emotion/styled";
import { Alert, Card, SmallBtn } from "@components";
import { BsX } from "react-icons/bs";
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

  return (
    <StyledGomokuCameraCard>
      {showAlert ? (
        <Alert
          body="게임을 종료할까요?"
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
              position: "absolute",
              right: 20,
              top: 20,
            }}
          >
            <SmallBtn
              icon={BsX}
              onClick={() => {
                setShowAlert(true);
              }}
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
