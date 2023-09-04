import { Global, css } from "@emotion/react";
import regular1 from "../assets/fonts/Cafe24Supermagic-Regular-v1.0.woff";
import regular2 from "../assets/fonts/Cafe24Supermagic-Regular-v1.0.woff2";
import bold1 from "../assets/fonts/Cafe24Supermagic-Bold-v1.0.woff";
import bold2 from "../assets/fonts/Cafe24Supermagic-Bold-v1.0.woff2";

function FontStyles() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Cafe24Supermagic";
          font-weight: bold;
          font-style: normal;
          src:
            url("${bold2}") format("woff2"),
            url("${bold1}") format("woff");
        }

        @font-face {
          font-family: "Cafe24Supermagic";
          font-weight: normal;
          font-style: normal;
          src:
            url("${regular2}") format("woff2"),
            url("${regular1}") format("woff");
        }

        button:hover {
          cursor: pointer;
        }
      `}
    />
  );
}

export default FontStyles;
