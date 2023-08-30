import styled from "@emotion/styled";
import logo from "@assets/images/Logo.png";
import vs from "@assets/images/vs.svg";
import whiteStone from "@assets/images/whiteStone.svg";
import blackStone from "@assets/images/blackStone.svg";
import arrow from "@assets/images/arrow.svg";

import { colorStyles, textStyles } from "@/styles";
import { GomokuProgressBar } from ".";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/user/atoms";
import { gomokuState, gomokuTurnState } from "@/recoil/gomoku/atoms";
import { useEffect, useState } from "react";
import useInterval from "use-interval";

function GomokuInfoCard() {
  const user = useRecoilValue(userState);
  const setting = useRecoilValue(gomokuState);
  const turn = useRecoilValue(gomokuTurnState);
  const [nowPlayer, setNowPlayer] = useState(0);

  const [time, setTime] = useState(-1);

  useInterval(() => {
    if (0 < time) {
      setTime((ot) => ot - 1);
      console.log("똑딱");
    }
  }, 100);

  useEffect(() => {
    if (setting.streamerColor === turn) {
      setTime(setting.streamerTime);
      setNowPlayer(1);
    } else {
      setTime(setting.viewerTime);
      setNowPlayer(2);
    }
  }, [turn]);

  return (
    <StyledGomokuInfoCard>
      <img css={{ width: 160 }} src={logo} />
      <div css={{ display: "flex", width: "100%", marginBlock: 20 }}>
        {UserInfo(user.name ?? "스트리머", "black")}
        <img css={{ width: 60 }} src={vs} />
        {UserInfo("시청자", "white")}
      </div>
      <GomokuProgressBar
        progress={
          nowPlayer === 1
            ? (time / setting.streamerTime) * 100
            : (time / setting.viewerTime) * 100
        }
      />
      {/* <h2
        css={{
          marginTop: 10,
          ...textStyles.contents,
        }}
      >
        {`스트리머가 선택 중...`}
      </h2> */}
      <div
        css={{
          marginTop: 10,
          color:
            time === -1 || time > 50 ? colorStyles.primary : colorStyles.danger,
          ...textStyles.contents,
        }}
      >
        {time === -1 ? `시간제한 없음` : `${time / 10}초`}
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
                  transform: `rotate(0.5turn)`,
                }}
                src={arrow}
              />
            ) : null}
          </>
        )}
        <h2
          css={{
            width: 180,
            textAlign: "center",
            textOverflow: "ellipsis",
            overflow: "hidden",
            marginTop: 10,
            ...textStyles.title2,
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
