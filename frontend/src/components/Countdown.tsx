import { textStyles } from "@/styles";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInterval from "use-interval";

function Countdown() {
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(3);

  useInterval(() => {
    setCount(count - 1);
  }, 1000);

  useEffect(() => {
    if (count < 0) {
      navigate("/gomoku");
    }
  }, [count]);

  return (
    <StyledCountdown>
      {count === 3 ? (
        <div css={{ ...textStyles.title1, fontSize: 80 }}>3</div>
      ) : count === 2 ? (
        <div css={{ ...textStyles.title1, fontSize: 80 }}>2</div>
      ) : count === 1 ? (
        <div css={{ ...textStyles.title1, fontSize: 80 }}>1</div>
      ) : (
        <div css={{ ...textStyles.title1, fontSize: 80 }}>START!</div>
      )}
    </StyledCountdown>
  );
}

export default Countdown;

const StyledCountdown = styled.div`
  width: 740px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
