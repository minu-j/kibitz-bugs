import loadingSpinner from "@assets/images/loadingSpinner.svg";

function LoadingSpinner() {
  return (
    <img
      css={{ animation: `spin 4s linear infinite` }}
      width={40}
      height={40}
      src={loadingSpinner}
    />
  );
}

export default LoadingSpinner;
