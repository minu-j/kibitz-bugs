import { playScreen } from "@/shared/resource/videos";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useInterval from "use-interval";
import { getGameCnt } from "@/entities/game/api";

import {
  Card,
  ChatCard,
  colorStyles,
  textShadowStyles,
  textStyles,
} from "@/shared/ui";
import { getLoginCnt } from "@/features/login/api";
import { IMessage } from "@/shared/types";
import { youtubeLogo } from "@/shared/resource/images";

function Description() {
  const { t } = useTranslation();
  const [loginCnt, setLoginCnt] = useState(0);
  const [gameCnt, setGameCnt] = useState(0);

  useEffect(() => {
    getGameCnt().then((res) => {
      setGameCnt(res.data.cnt);
    });
    getLoginCnt().then((res) => {
      setLoginCnt(res.data.cnt);
    });
  }, []);

  return (
    <div
      css={{
        marginBlock: 48,
        width: "100%",
        maxWidth: 520,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3
        css={{
          ...textStyles.title3,
          marginBottom: 8,
          filter: textShadowStyles.shadow,
        }}
      >
        {t("pages.login.title1")}
      </h3>
      <p css={{ ...textStyles.contents, filter: textShadowStyles.shadow }}>
        {t("pages.login.description1")}
      </p>
      <div
        css={{
          width: "100%",
          maxWidth: 480,
          transform: "scale(0.7)",
          zIndex: 1,
        }}
      >
        <DemoChatCard />
      </div>
      <div
        css={{
          width: "100%",
          aspectRatio: 1,
          mixBlendMode: "darken",
          filter: "brightness(1.12)",
          marginTop: -140,
          transform: "scale(1.2)",
        }}
      >
        <div
          css={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at 50% 50%, #ffffff00 40%, #ffffff 70%)",
          }}
        />
        <video
          css={{
            width: "100%",
            height: "100%",
            zIndex: -1,
            position: "absolute",
          }}
          src={playScreen}
          loop
          muted
          autoPlay
          playsInline
        />
      </div>
      <div
        css={{
          marginBlock: 48,
          width: "100%",
          maxWidth: 520,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3 css={{ ...textStyles.title3, marginBottom: 8 }}>
          {t("pages.login.title2")}
        </h3>
        <p css={textStyles.contents}>{t("pages.login.description2")}</p>
        <div
          css={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            margin: 32,
          }}
        >
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <p css={textStyles.title2}>{(loginCnt / 1000).toFixed(1)}k+</p>
            <p css={textStyles.contents}>{t("pages.login.login count")}</p>
          </div>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <p css={textStyles.title2}>{(gameCnt / 1000).toFixed(1)}k+</p>
            <p css={textStyles.contents}>{t("pages.login.game count")}</p>
          </div>
        </div>
        <a
          href="https://youtube.com/playlist?list=PL5gs1D9-S_9g4hkd-Z14JvIV6zTFS3nZx&si=rAflflhGS3tLEJbv"
          target="_blank"
          rel="noopener noreferrer"
          css={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: colorStyles.primary,
            border: `2px solid ${colorStyles.primary}`,
            borderRadius: 12,
            padding: "8px 24px",
            marginBlock: 24,
            backgroundColor: "#ffffff",
            animation: "breath 2s alternate infinite ease-in-out",

            "&:hover": {
              filter: "brightness(0.9)",
            },
          }}
        >
          <img src={youtubeLogo} alt="youtube logo" width={24} height={24} />
          <span css={textStyles.contents}>{t("유튜브에서 다시보기")}</span>
        </a>
      </div>
    </div>
  );
}

export default Description;

function DemoChatCard() {
  const [demoQueue, setDemoQueue] = useState<IMessage[]>([
    {
      name: "일반인",
      content: "j10",
      status: "success",
    },
    {
      name: "훈수남",
      content: "7g",
      status: "error",
    },
    {
      name: "오목고수",
      content: "J10",
      status: "success",
    },
    {
      name: "티라노사우루스",
      content: "h9",
      status: "success",
    },
    {
      name: "성난시청자",
      content: "10J",
      status: "success",
    },
    {
      name: "유칼립투스",
      content: "J10",
      status: "success",
    },
    {
      name: "달리는 고양이",
      content: "I10",
      status: "error",
    },
    {
      name: "오동나무",
      content: "f7",
      status: "success",
    },
    {
      name: "달콤한 사탕",
      content: "j10",
      status: "success",
    },
  ]);

  useInterval(() => {
    setDemoQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      const firstValue = newQueue.shift();
      return [...newQueue, firstValue] as IMessage[];
    });
  }, 300);
  return <ChatCard chatQueue={demoQueue} />;
}
