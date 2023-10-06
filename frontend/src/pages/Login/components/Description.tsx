import { ChatCard } from "@/components";
import { IMessage } from "@/recoil/chat/atoms";
import { textStyles } from "@/styles";
import playScreen from "@assets/videos/playScreen.mp4";
import { useState } from "react";
import useInterval from "use-interval";

function Description() {
  return (
    <div
      css={{
        marginBlock: 48,
        width: "100%",
        maxWidth: 520,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <h3 css={{ ...textStyles.title3, marginBottom: 8 }}>
        채팅으로 투표하세요
      </h3>
      <p css={textStyles.contents}>
        가장 많은 표를 획득한 좌표는 시청자의 수가 됩니다
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
          이미 인기있는 트위치 게임입니다
        </h3>
        <p css={textStyles.contents}>여러 유명 스트리머가 플레이했습니다</p>
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
            <p css={textStyles.title2}>1,400+</p>
            <p css={textStyles.contents}>스트리머 로그인</p>
          </div>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <p css={textStyles.title2}>3,000+</p>
            <p css={textStyles.contents}>게임 플레이</p>
          </div>
        </div>
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
