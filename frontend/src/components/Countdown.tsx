import styled from "@emotion/styled/macro";
import { useNavigate } from "react-router-dom";
import useInterval from "use-interval";

function GomokuSetting() {
  const navigate = useNavigate();

  useInterval(() => {
    navigate("");
  }, 1000);

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
