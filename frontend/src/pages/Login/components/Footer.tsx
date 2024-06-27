import { colorStyles, textStyles } from "@/styles";
import { BsGithub } from "react-icons/bs";

function Footer() {
  const appVersion = import.meta.env.VITE_REACT_APP_VERSION;
  return (
    <footer
      css={{
        backgroundColor: colorStyles.primary,
        width: "100vw",
        paddingInline: 24,
        paddingBlock: 24,
        marginTop: 60,
        fontSize: 12,
        display: "flex",
        justifyContent: "space-between",
        ["@media (max-width: 576px)"]: {
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: 4,
          ["@media (max-width: 576px)"]: {
            alignItems: "center",
            marginBottom: 24,
          },
        }}
      >
        <p
          css={{
            color: "white",
            ...textStyles.title2,
          }}
        >
          {"Kibitz bugs"}
        </p>
        <p
          css={{
            color: "white",
            ...textStyles.title3,
          }}
        >
          {"키비츠 벅스"}
        </p>
        <p
          css={{
            color: "white",
          }}
        >{`ver.${appVersion}`}</p>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "end",
          gap: 4,
          ["@media (max-width: 576px)"]: {
            alignItems: "center",
          },
        }}
      >
        <a
          css={{
            color: "white",
          }}
          href="https://github.com/minu-j/kibitz-bugs"
        >
          <BsGithub
            css={{
              marginRight: 2,
              fill: "white",
            }}
          />
          Github
        </a>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            gap: 4,
            ["@media (max-width: 576px)"]: {
              alignItems: "center",
            },
          }}
        >
          <div>
            <span css={{ color: colorStyles.lightGray }}>Developed by</span>
            <a
              css={{ color: colorStyles.lightGray }}
              href="https://github.com/ysu6691"
            >
              {" "}
              ysu6691,
            </a>
            <a
              css={{ color: colorStyles.lightGray }}
              href="https://github.com/minu-j"
            >
              {" "}
              minu-j
            </a>
            <span css={{ color: colorStyles.lightGray }}>{" "}</span>
          </div>
            <div>
            <span css={{ color: colorStyles.lightGray }}>
              Copyright © 2024 All Rights Reserved
            </span>
            </div>
          <p>
          <a css={{ color: colorStyles.lightGray, opacity: 0.3 }}>
            Image by rawpixel.com on Freepik
          </a>
              <span css={{ color: colorStyles.lightGray }}>{"  ·  "}</span>
            <a
              href="https://kibitz-bugs.xyz/terms/"
              css={{ color: colorStyles.lightGray }}
            >
              개인정보 처리방침
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
