import { background } from "@/shared/resource/images";

function Background() {
  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -100,
        backgroundImage: `url("${background}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    />
  );
}

export default Background;
