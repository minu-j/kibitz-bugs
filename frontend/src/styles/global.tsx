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
        }

        button:hover {
          cursor: pointer;
        }
      `}
    />
  );
}

export default GlobalStyles;
