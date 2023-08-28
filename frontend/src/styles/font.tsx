import { Global, css } from "@emotion/react";

function FontStyles() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Cafe24Supermagic";
          font-weight: bold;
          font-style: normal;
          src: url("src/assets/fonts/Cafe24Supermagic-Bold-v1.0.woff2")
              format("woff2"),
            url("src/assets/fonts/Cafe24Supermagic-Bold-v1.0.woff")
              format("woff");
        }

        @font-face {
          font-family: "Cafe24Supermagic";
          font-weight: normal;
          font-style: normal;
          src: url("src/assets/fonts/Cafe24Supermagic-Regular-v1.0.woff2")
              format("woff2"),
            url("src/assets/fonts/Cafe24Supermagic-Regular-v1.0.woff")
              format("woff");
        }

        button:hover {
          cursor: pointer;
        }
      `}
    />
  );
}

export default FontStyles;
