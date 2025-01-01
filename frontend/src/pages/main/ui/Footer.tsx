import { colorStyles } from "@/shared/ui";
import { BsGithub } from "react-icons/bs";

import cartoonLogo from "./cartoon_logo.svg";

function Footer() {
  const appVersion = import.meta.env.VITE_REACT_APP_VERSION;
  return (
    <div
      css={{
        width: "100%",
        marginTop: 120,
        fontSize: 12,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <a
        href="https://github.com/minu-j/kibitz-bugs"
        css={{
          fontSize: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          gap: 12,
        }}
      >
        <BsGithub
          css={{
            fontSize: 64,
            fill: colorStyles.primary,
          }}
        />
        <span
          css={{
            color: colorStyles.primary,
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          GitHub
        </span>
      </a>
      <footer
        css={{
          backgroundColor: "#161617",
          paddingInline: 40,
          paddingTop: 64,
          width: "100%",
          paddingBottom: 120,
          marginTop: 140,
          fontSize: 12,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: 80,
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <img
            css={{
              height: 64,
            }}
            src={cartoonLogo}
            alt="logo"
          />
          <a
            href="https://github.com/minu-j/kibitz-bugs/releases"
            css={{
              color: colorStyles.lightGray,
              fontWeight: "bold",
            }}
          >{`ver.${appVersion}`}</a>
        </div>

        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",

            gap: 4,
            alignItems: "center",
          }}
        >
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              alignItems: "center",
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
              <a
                href="https://kibitz-bugs.xyz/terms/"
                css={{ color: colorStyles.lightGray }}
              >
                개인정보 처리방침
              </a>
              <span css={{ color: colorStyles.lightGray }}>{"  ·  "}</span>
              <a
                href="https://github.com/minu-j/kibitz-bugs/blob/master/LICENSE"
                css={{ color: colorStyles.lightGray }}
              >
                라이센스
              </a>
            </p>
            <a css={{ color: colorStyles.lightGray, opacity: 0.3 }}>
              Image by rawpixel.com on Freepik
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
