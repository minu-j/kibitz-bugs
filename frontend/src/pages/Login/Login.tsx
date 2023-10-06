import styled from "@emotion/styled";
import { Description, Footer, Header, LoginBtn } from "./components";
import { Background } from "@/components";

function Login() {
  return (
    <StyledLogin>
      {/* <button>언어</button> */}
      <Header />
      <LoginBtn />
      <Description />
      <LoginBtn />
      <Footer />
      <Background />
    </StyledLogin>
  );
}

export default Login;

const StyledLogin = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
