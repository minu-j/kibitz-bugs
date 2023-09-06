import styled from "@emotion/styled";
import logo from "@assets/images/Logo.png";
import vs from "@assets/images/vs.svg";
import whiteStone from "@assets/images/whiteStone.svg";
import blackStone from "@assets/images/blackStone.svg";
import arrow from "@assets/images/arrow.svg";

import { colorStyles, textStyles } from "@/styles";
import { GomokuProgressBar } from ".";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/recoil/user/atoms";
import {
  gomokuNowPlayerState,
  gomokuResultState,
  gomokuState,
  gomokuTurnState,
  gomokuVoteState,
} from "@/recoil/gomoku/atoms";
import { useEffect, useState } from "react";
import useInterval from "use-interval";
import useMoveStone from "@/hooks/useMoveStone";
import { str2numCoord } from "@/utils/str2numCoord";
import timer from "@assets/audios/timer.mp3";

function GomokuInfoCard() {
  const user = useRecoilValue(userState);
  const setting = useRecoilValue(gomokuState);
  const turn = useRecoilValue(gomokuTurnState);
  const [nowPlayer, setNowPlayer] = useRecoilState(gomokuNowPlayerState);
  const [time, setTime] = useState(-1);
  const [vote, setVote] = useRecoilState(gomokuVoteState);
  const setResult = useSetRecoilState(gomokuResultState);

  const moveStone = useMoveStone();
  const timerSound = new Audio(timer);

  useInterval(() => {
    if (0 < time && time <= 6) {
      timerSound.play();
    }
    if (0 < time) {
      setTime((ot) => ot - 1);
    } else if (time === 0) {
      if (nowPlayer === 1) {
        setResult(2);
      } else {
        if (vote.total) {
          let maxKey = "";
          let maxValue = -1;

          for (const [key, value] of vote.count) {
            if (value > maxValue) {
              maxKey = key;
              maxValue = value;
            }
          }
          const [i, j] = str2numCoord(maxKey);
          moveStone(i, j, setting.viewerColor);
        } else {
          setResult(1);
        }
      }
    }
  }, 1000);

  useEffect(() => {
    if (setting.streamerColor === turn) {
      setTime(setting.streamerTime);
      setNowPlayer(1);
    } else {
      setTime(setting.viewerTime);
      setNowPlayer(2);
    }
    setVote({ count: new Map(), total: 0 });
  }, [turn]);

  return (
    <StyledGomokuInfoCard>
      <img css={{ width: 160 }} src={logo} />
      <div css={{ display: "flex", width: "100%", marginBlock: 20 }}>
        {UserInfo(user.nickname ?? "스트리머", "black")}
        <img
          css={{
            width: 60,
            animation: `breath 1s alternate ease-in-out infinite`,
          }}
          src={vs}
        />
        {UserInfo("시청자", "white")}
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
        {time === -1 ? `시간제한 없음` : `남은시간 ${time}초`}
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

export default GomokuInfoCard;

const StyledGomokuInfoCard = styled.section`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
