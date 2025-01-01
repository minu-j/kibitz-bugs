import { colorStyles } from "@/shared/ui";
import { BsGithub } from "react-icons/bs";
import cartoonLogo from "./cartoon_logo.svg";

function Footer() {
  const appVersion = import.meta.env.VITE_REACT_APP_VERSION;
  return (
    <footer
      css={{
        backgroundColor: colorStyles.primary,
        width: "100%",
        paddingInline: 40,
        paddingBlock: 64,
        marginTop: 160,
        fontSize: 14,
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
          gap: 80,
          ["@media (max-width: 576px)"]: {
            alignItems: "center",
            marginBottom: 24,
          },
        }}
      >
        <img
          css={{
            height: 64,
          }}
          src={cartoonLogo}
          alt="logo"
        />
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
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          href="https://github.com/minu-j/kibitz-bugs"
        >
          <BsGithub
            css={{
              fontSize: 24,
              fill: "white",
            }}
          />
          GitHub
        </a>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            gap: 8,
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
            <span css={{ color: colorStyles.lightGray }}> </span>
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
