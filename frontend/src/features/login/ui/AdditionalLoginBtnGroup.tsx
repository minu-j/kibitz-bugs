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
import { userStore } from "@/entities/auth";

const clickSound = new Audio(click);
const hoverSound = new Audio(hover);

function AdditionalLoginBtnGroup() {
  const { getIsChzzkLogin, getIsTwitchLogin, getIsSoopLogin } = userStore();
  const { twitchLogin, soopLogin, chzzkLogin, youtubeLogin } = useLogin();
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
      },
      alt: "chzzk login button",
      active: true,
      isLogin: getIsChzzkLogin(),
    },
    {
      id: 1,
      bgColor: "#17191C",
      fgColor: "#0387FE",
      buttonBgColor: "transparent",
      logoImg: soopLogoBig,
      onClick: () => {
        soopLogin();
      },
      alt: "soop login button",
      active: true,
      isLogin: getIsSoopLogin(),
    },
    {
      id: 2,
      bgColor: "#FFFFFF",
      fgColor: "#000000",
      buttonBgColor: "#000000",
      logoImg: youtubeLogoBig,
      onClick: () => {
        youtubeLogin();
      },
      alt: "youtube login button",
      active: false,
      isLogin: getIsTwitchLogin(),
    },
    {
      id: 3,
      bgColor: "#9246FF",
      fgColor: "#000000",
      buttonBgColor: "transparent",
      logoImg: twitchLogoBig,
      onClick: () => {
        twitchLogin();
      },
      alt: "twitch login button",
      active: true,
      isLogin: getIsTwitchLogin(),
    },
  ];

  return (
    <div
      css={{
        display: "flex",
        alignItems: "end",
        height: "100%",
        marginTop: "8px",
        paddingInline: "8px",
      }}
    >
      <div
        css={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
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
                    if (button.isLogin) return;
                    button.onClick();
                    clickSound.play();
                  }}
                  onMouseEnter={() => {
                    if (button.isLogin) return;
                    setHoverId(button.id);
                    hoverSound.play();
                  }}
                  onMouseLeave={() => {
                    if (button.isLogin) return;
                    setHoverId(undefined);
                    hoverSound.pause();
                    hoverSound.currentTime = 0;
                  }}
                  css={{
                    padding: "0",
                    maxWidth: "150px",
                    height: "45px",
                    position: "relative",
                    border: `2px solid ${button.fgColor}`,
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: button.isLogin ? "default !important" : "pointer",
                    backgroundColor: button.buttonBgColor,
                    filter: button.isLogin
                      ? "none"
                      : "grayscale(80%) opacity(0.3) brightness(1.2)",
                    transition: "all 0.1s",
                    "&:hover": {
                      scale: button.isLogin ? "1" : "1.03",
                      filter: "grayscale(0%) opacity(1) brightness(1)",
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
                    css={{ width: "60%" }}
                  />
                </button>
              </div>
            ),
        )}
      </div>
    </div>
  );
}

export default AdditionalLoginBtnGroup;
