import loadingSpinner from "@assets/images/loadingSpinner.svg";
import { Background } from ".";

function LoadingSpinner() {
  return (
    <main
      css={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        css={{ animation: `spin 4s linear infinite` }}
        width={40}
        height={40}
        src={loadingSpinner}
      />
      <Background />
    </main>
  );
}

export default LoadingSpinner;
