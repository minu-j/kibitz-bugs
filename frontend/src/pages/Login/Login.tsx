import Logo from "../../assets/images/Logo.png";
import styled from "@emotion/styled";
import { LargeBtn } from "../../components";
import { useNavigate } from "react-router-dom";
import { textStyles } from "../../styles";

function Login() {
  const navigate = useNavigate();

  return (
    <StyledLogin>
      <div>
        <img
          css={{
            width: "60%",
          }}
          src={Logo}
        />
        <h1 css={{ ...textStyles.title2 }}>키비츠 벅스</h1>
      </div>
      <LargeBtn
        label="로그인"
        onClick={() => {
          navigate("/setting");
        }}
      />
    </StyledLogin>
  );
}

export default Login;

const StyledLogin = styled.main`
  width: 1280px;
  height: 720px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
