import { Global, css } from "@emotion/react";

function GlobalStyles() {
  return (
    <Global
      styles={css`
        * {
          font-family: "Apple SD Gothic Neo", "Noto Sans KR", "Nanum Gothic",
            "Malgun Gothic", sans-serif;
          position: relative;
          box-sizing: border-box;
          word-break: keep-all;
          color: #2d2e38;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -o-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }

        img {
        }

        button:hover {
          cursor: pointer;
        }

        body {
          overflow-x: hidden;
        }
      `}
    />
  );
}

export default GlobalStyles;
