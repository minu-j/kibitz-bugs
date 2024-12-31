import styled from "@emotion/styled";
import { logo, vs, whiteStone, blackStone } from "@/shared/resource/images";
import arrow from "./arrow.svg";

import { colorStyles, textStyles } from "@/shared/ui";
import { useRecoilValue } from "recoil";

import { useTranslation } from "react-i18next";
import { userState } from "@/entities/auth";
import { gomokuNowPlayerState, gomokuState } from "@/entities/game";
import GomokuProgressBar from "./GomokuProgressBar";
import { useGameplay } from "@/features/gameplay";

function GomokuTimer() {
  const { t } = useTranslation();
  const user = useRecoilValue(userState);
  const setting = useRecoilValue(gomokuState);
  const nowPlayer = useRecoilValue(gomokuNowPlayerState);

  const { time } = useGameplay();

  return (
    <StyledGomokuInfoCard>
      <img css={{ width: 160 }} src={logo} />
      <div css={{ display: "flex", width: "100%", marginBlock: 20 }}>
        {UserInfo(user.nickname ?? t("streamer"), "black")}
        <img
          css={{
            width: 60,
            animation: `breath 1s alternate ease-in-out infinite`,
          }}
          src={vs}
        />
        {UserInfo(t("viewers"), "white")}
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

  function UserInfo(label: string, color: "black" | "white") {
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
        {color === "black" ? (
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
            marginTop: 10,
            ...textStyles.contents,
          }}
        >
          {label}
        </h2>
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
