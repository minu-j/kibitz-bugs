import { useNavigate } from "react-router-dom";
import { LargeBtn, Background, textStyles } from "@/shared/ui";

function NotFound() {
  const navigate = useNavigate();
  const handleClickBtn = () => {
    navigate(-1);
  };
  return (
    <main
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
      }}
    >
      <h1 css={textStyles.title1}>Not Found 404</h1>
      <h2 css={textStyles.title2}>페이지를 찾을 수 없습니다.</h2>
      <LargeBtn label="Go back" onClick={handleClickBtn} />
      <Background />
    </main>
  );
}

export default NotFound;
