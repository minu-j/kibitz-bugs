import { RouterProvider } from "react-router-dom";
import browserRouter from "./router/browserRouter";
import Background from "./components/Background";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  FontStyles,
  GlobalAnimations,
  GlobalStyles,
  ResetStyles,
} from "./styles";
import { RecoilRoot } from "recoil";
import { Bgm } from "./components";

function App() {
  const [windowScale, setWindowScale] = useState<number>(
    Math.min(window.innerWidth / 1280, window.innerHeight / 720),
  );

  const handleResize = () => {
    setWindowScale(
      Math.min(window.innerWidth / 1280, window.innerHeight / 720),
    );
  };

  useEffect(() => {
    // 화면 크기 변경 시 이벤트 핸들러 연결
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <RecoilRoot>
      <StyledApp>
        <FontStyles />
        <GlobalStyles />
        <ResetStyles />
        <GlobalAnimations />
        {/* <Bgm /> */}
        <StyledMainPage
          style={{
            transform: `translate(-50%, -50%) scale(${windowScale})`,
          }}
        >
          <RouterProvider router={browserRouter} />
        </StyledMainPage>
        <Background />
      </StyledApp>
    </RecoilRoot>
  );
}

export default App;

const StyledApp = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
`;

const StyledMainPage = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
`;
