import styled from "@emotion/styled";

import SelectLocales from "@/features/locales/components/SelectLocales.tsx";
import { Background } from "@/shared/ui";
import { Header, LoginBtn, Description, Footer } from "./ui";

function Login() {
  return (
    <StyledLogin>
      <Header />
      <LoginBtn />
      <SelectLocales />
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
  padding: 0px 24px;
`;
