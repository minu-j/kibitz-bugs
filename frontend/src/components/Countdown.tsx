import styled from "@emotion/styled/macro";

function GomokuSetting() {
  const navigate = useNavigate();

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
