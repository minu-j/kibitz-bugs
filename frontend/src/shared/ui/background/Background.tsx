import backgroundImg from "./background.jpg";

function Background() {
  return (
    <div
      css={{
        opacity: 0.4,
        mixBlendMode: "darken",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -100,
        backgroundImage: `url("${backgroundImg}")`,
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
