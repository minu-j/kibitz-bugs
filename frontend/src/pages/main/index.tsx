import styled from "@emotion/styled";

import { Background } from "@/shared/ui";
import { Header, LoginBtn, Description, Footer } from "./ui";
import { SelectLocales } from "@/shared/i18n";

function Main() {
  return (
    <StyledMain>
      <Header />
      <LoginBtn />
      <SelectLocales />
      <Description />
      <LoginBtn />
      <Footer />
      <Background />
    </StyledMain>
  );
}

export default Main;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
`;
