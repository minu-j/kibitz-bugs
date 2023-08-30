import styled from "@emotion/styled";
import { Alert, Card, SmallBtn } from "@components";
import { textStyles } from "@/styles";
import { BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useResetGomoku from "@/hooks/useResetGomoku";

function GomokuCameraCard() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const resetGomoku = useResetGomoku();

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
          <h4
            css={{ ...textStyles.contents }}
          >{`카메라를 여기에 놓아주세요`}</h4>
          <div
            css={{
              position: "absolute",
              right: 10,
              bottom: 10,
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
