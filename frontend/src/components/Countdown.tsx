import styled from "@emotion/styled/macro";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInterval from "use-interval";

function GomokuSetting() {
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
    <StyledGomokuSetting>
      <div>5</div>
    </StyledGomokuSetting>
  );
}

export default GomokuSetting;

const StyledGomokuSetting = styled.div`
  width: 740px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
