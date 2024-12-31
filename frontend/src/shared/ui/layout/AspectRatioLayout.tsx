import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Background } from "@/shared/ui";

function AspectRatioLayout({ children }: { children: React.ReactNode }) {
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
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <StyledAspectRatioLayout>
      <main
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${windowScale})`,
          padding: "44px 80px",
          width: "1280px",
          height: "720px",
          display: "flex",
        }}
      >
        {children}
      </main>
      <Background />
    </StyledAspectRatioLayout>
  );
}

export default AspectRatioLayout;

const StyledAspectRatioLayout = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
`;
