import { Background, textStyles } from "@/shared/ui";

function Maintenance() {
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
      <h2 css={textStyles.title2}>시스템 점검중입니다.</h2>
      <Background />
    </main>
  );
}

export default Maintenance;
