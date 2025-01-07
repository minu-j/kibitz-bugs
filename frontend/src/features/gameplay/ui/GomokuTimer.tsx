import styled from "@emotion/styled";
import { logo, vs, whiteStone, blackStone } from "@/shared/resource/images";
import arrow from "./arrow.svg";

import { colorStyles, textStyles } from "@/shared/ui";
import { useRecoilValue } from "recoil";

import { useTranslation } from "react-i18next";
import { userStore } from "@/entities/auth";
import { gomokuNowPlayerState, gomokuState } from "@/entities/game";
import GomokuProgressBar from "./GomokuProgressBar";
import { useGameplay } from "@/features/gameplay";

function GomokuTimer() {
  const { t } = useTranslation();
  const { user } = userStore();
  const setting = useRecoilValue(gomokuState);
  const nowPlayer = useRecoilValue(gomokuNowPlayerState);

  const { time } = useGameplay();

  return (
    <StyledGomokuInfoCard>
      <img css={{ width: 160 }} src={logo} />
      <div
        css={{
          display: "flex",
          width: "100%",
          marginBlock: 16,
        }}
      >
        {UserInfo(user.nickname ?? t("streamer"), "left")}
        <img
          css={{
            width: 60,
            animation: `breath 1s alternate ease-in-out infinite`,
          }}
          src={vs}
        />

        {UserInfo(
          setting.viewerNickname ? setting.viewerNickname : t("viewers"),
          "right",
        )}
      </div>
      <GomokuProgressBar
        progress={
          nowPlayer === 1
            ? (time / setting.streamerTime) * 100
            : (time / setting.viewerTime) * 100
        }
      />
      <div
        css={{
          marginTop: 10,
          color:
            time === -1 || time > 5 ? colorStyles.primary : colorStyles.danger,
          ...textStyles.contents,
        }}
      >
        {time === -1
          ? t("pages.gomoku.no time limit")
          : time + " " + t("pages.gomoku.time remaining")}
      </div>
    </StyledGomokuInfoCard>
  );

  function UserInfo(label: string, side: "left" | "right") {
    return (
      <div
        css={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {side === "left" ? (
          <>
            {nowPlayer === 1 ? (
              <img
                css={{
                  position: "absolute",
                  top: 5,
                  left: 20,
                  animation: `pointer 1s alternate ease-in-out infinite`,
                }}
                src={arrow}
              />
            ) : null}
            <img
              css={{ width: 40 }}
              src={setting.streamerColor === 1 ? blackStone : whiteStone}
            />
          </>
        ) : (
          <>
            <img
              css={{ width: 40 }}
              src={setting.viewerColor === 1 ? blackStone : whiteStone}
            />
            {nowPlayer === 2 ? (
              <img
                css={{
                  position: "absolute",
                  top: 5,
                  right: 20,
                  animation: `rotatedPointer 1s alternate ease-in-out infinite`,
                }}
                src={arrow}
              />
            ) : null}
          </>
        )}
        <h2
          css={{
            width: 160,
            textAlign: "center",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 4,
            ...textStyles.contents,
            marginTop: 6,
          }}
        >
          {label}
        </h2>
        {/* <span css={{ ...textStyles.contents, fontSize: 18, marginTop: 4 }}>
          1명
        </span> */}
      </div>
    );
  }
}

export default GomokuTimer;

const StyledGomokuInfoCard = styled.section`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
