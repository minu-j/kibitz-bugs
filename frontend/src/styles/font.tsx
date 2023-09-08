import { Global, css } from "@emotion/react";

function FontStyles() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Cafe24Supermagic";
          src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/Cafe24Supermagic-Bold-v1.0.woff2")
            format("woff2");
          font-weight: 700;
          font-style: normal;
        }

        button:hover {
          cursor: pointer;
        }
      `}
    />
  );
}

export default FontStyles;
