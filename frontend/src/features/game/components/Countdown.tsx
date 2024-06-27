import { textStyles } from "@/styles";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInterval from "use-interval";
import countdown from "@/assets/audios/countdown.mp3";
import start from "@/assets/audios/start.mp3";

function Countdown() {
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(3);
  const countdownSound = new Audio(countdown);
  const startSound = new Audio(start);

  useInterval(() => {
    setCount(count - 1);
    if (count > 1) {
      countdownSound.play();
    } else if (count === 1) {
      startSound.play();
    }
  }, 1000);

  useEffect(() => {
    if (count < 0) {
      navigate("/gomoku");
    }
  }, [count]);

  return (
    <StyledCountdown>
      {count === 3 ? (
        <div
          css={{
            ...textStyles.title1,
            fontSize: 120,
            animation: `countPop 1s 0s both`,
          }}
        >
          3
        </div>
      ) : count === 2 ? (
        <div
          css={{
            ...textStyles.title1,
            fontSize: 120,
            animation: `countPop 1s 1s both`,
          }}
        >
          2
        </div>
      ) : count === 1 ? (
        <div
          css={{
            ...textStyles.title1,
            fontSize: 120,
            animation: `countPop 1s 2s both`,
          }}
        >
          1
        </div>
      ) : (
        <div
          css={{
            ...textStyles.title1,
            fontSize: 120,
            animation: `countPop 1s 3s both`,
          }}
        >
          START!
        </div>
      )}
    </StyledCountdown>
  );
}

export default Countdown;

const StyledCountdown = styled.div`
  width: 720px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
