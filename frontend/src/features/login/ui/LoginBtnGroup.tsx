import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { useLogin } from "@/features/login";
import twitchLogoBig from "./twitch_logo_big.svg";
import chzzkLogoBig from "./chzzk_logo_big.svg";
import youtubeLogoBig from "./youtube_logo_big.svg";
import soopLogoBig from "./soop_logo_big.svg";
import useInterval from "use-interval";
import { useState } from "react";
import buttonBg1 from "./button_bg_1.svg";
import buttonBg2 from "./button_bg_2.svg";
import buttonBg3 from "./button_bg_3.svg";

import { click, hover } from "@/shared/resource/audios";
import { textShadowStyles, textStyles } from "@/shared/ui";

const clickSound = new Audio(click);
const hoverSound = new Audio(hover);

function LoginBtnGroup() {
  const { t } = useTranslation();
  const { twitchLogin, soopLogin, chzzkLogin, youtubeLogin } = useLogin();
  const recentProvider = localStorage.getItem("recent_provider");
  const [index, setIndex] = useState(0);
  const [hoverId, setHoverId] = useState<number | undefined>(undefined);
  useInterval(() => {
    if (index === 2) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  }, 200);

  const buttons = [
    {
      id: 0,
      bgColor: "#000000",
      fgColor: "#00FFA3",
      buttonBgColor: "transparent",
      logoImg: chzzkLogoBig,
      onClick: () => {
        chzzkLogin();
        localStorage.setItem("recent_provider", "chzzk");
      },
      alt: "chzzk login button",
      active: true,
      recent: recentProvider === "chzzk",
    },
    {
      id: 1,
      bgColor: "#17191C",
      fgColor: "#0387FE",
      buttonBgColor: "transparent",
      logoImg: soopLogoBig,
      onClick: () => {
        soopLogin();
        localStorage.setItem("recent_provider", "soop");
      },
      alt: "soop login button",
      active: true,
      recent: recentProvider === "soop",
    },
    {
      id: 2,
      bgColor: "#FFFFFF",
      fgColor: "#000000",
      buttonBgColor: "#000000",
      logoImg: youtubeLogoBig,
      onClick: () => {
        youtubeLogin();
        localStorage.setItem("recent_provider", "youtube");
      },
      alt: "youtube login button",
      active: false,
      recent: recentProvider === "youtube",
    },
    {
      id: 3,
      bgColor: "#9246FF",
      fgColor: "#000000",
      buttonBgColor: "transparent",
      logoImg: twitchLogoBig,
      onClick: () => {
        twitchLogin();
        localStorage.setItem("recent_provider", "twitch");
      },
      alt: "twitch login button",
      active: true,
      recent: recentProvider === "twitch",
    },
  ];

  return isMobile ? (
    <p
      css={{
        animation: `floadingUpDown 1s alternate ease-in-out infinite`,
        ...textStyles.contents,
        filter: textShadowStyles.shadow,
      }}
    >
      {t("pages.login.play on pc")}
    </p>
  ) : (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <p
        css={{
          animation: `floadingUpDown 1s alternate ease-in-out infinite`,
          ...textStyles.contents,
          filter: textShadowStyles.shadow,
        }}
      >
        {t("pages.login.click for login")}
      </p>
      <div
        css={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",

          "@media (max-width: 528px)": {
            flexDirection: "column",
            justifyContent: "center",
            margin: "0 auto",
          },
        }}
      >
        {buttons.map(
          (button, idx) =>
            button.active && (
              <div
                key={`${button.alt}-${idx}`}
                css={{
                  position: "relative",
                }}
              >
                <button
                  onClick={() => {
                    button.onClick();
                    clickSound.play();
                  }}
                  onMouseEnter={() => {
                    setHoverId(button.id);
                    hoverSound.play();
                  }}
                  onMouseLeave={() => {
                    setHoverId(undefined);
                    hoverSound.pause();
                    hoverSound.currentTime = 0;
                  }}
                  css={{
                    padding: "0",
                    maxWidth: "150px",
                    height: "60px",
                    position: "relative",
                    border: `3px solid ${button.fgColor}`,
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: button.buttonBgColor,
                    transition: "scale 0.1s",
                    "&:hover": {
                      scale: "1.03",
                    },
                  }}
                >
                  <div
                    css={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      scale: "1.15",
                    }}
                  >
                    {hoverId === button.id ? (
                      <>
                        {index === 0 ? (
                          <div
                            css={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: button.bgColor,
                              maskImage: `url(${buttonBg1})`,
                              maskSize: "100% 100%",
                            }}
                          />
                        ) : index === 1 ? (
                          <div
                            css={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: button.bgColor,
                              maskImage: `url(${buttonBg2})`,
                              maskSize: "100% 100%",
                            }}
                          />
                        ) : (
                          <div
                            css={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: button.bgColor,
                              maskImage: `url(${buttonBg3})`,
                              maskSize: "100% 100%",
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <div
                        css={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: button.bgColor,
                          maskImage: `url(${
                            button.id === 0
                              ? buttonBg1
                              : button.id === 1
                              ? buttonBg2
                              : buttonBg3
                          })`,
                          maskSize: "100% 100%",
                        }}
                      />
                    )}
                  </div>
                  <img
                    src={button.logoImg}
                    alt={button.alt}
                    css={{ width: "70%" }}
                  />
                </button>
                {button.recent && (
                  <div
                    css={{
                      position: "absolute",
                      bottom: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      ...textStyles.contents,
                      color: button.bgColor,
                      backgroundColor: button.fgColor,
                      borderRadius: "6px",
                      padding: "5px",
                    }}
                  >
                    최근 로그인
                  </div>
                )}
              </div>
            ),
        )}
      </div>
    </div>
  );
}

export default LoginBtnGroup;
