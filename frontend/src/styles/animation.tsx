import { Global, css } from "@emotion/react";

function GlobalAnimations() {
  return (
    <Global
      styles={css`
        @keyframes rotatedPointer {
          from {
            transform: translateX(5%) rotate(0.5turn);
          }
          to {
            transform: translateX(-5%) rotate(0.5turn);
          }
        }
        @keyframes pointer {
          from {
            transform: translateX(5%);
          }
          to {
            transform: translateX(-5%);
          }
        }
        @keyframes breath {
          from {
            transform: scale(1.05);
          }
          to {
            transform: scale(0.95);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0turn);
          }
          to {
            transform: rotate(1turn);
          }
        }
        @keyframes countPop {
          0% {
            transform: scale(0);
          }
          20% {
            transform: scale(1.3);
          }
          30% {
            transform: scale(1);
          }
          90% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
        @keyframes popIn {
          0% {
            transform: scale(0);
          }
          95% {
            transform: scale(1);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes floadingUpDown {
          from {
            transform: translateY(-30%);
          }
          to {
            transform: translateY(0%);
          }
        }
      `}
    />
  );
}

export default GlobalAnimations;
