import styled from "@emotion/styled";
import { textStyles } from "@styles";
import vs from "@assets/images/vs.svg";
import { TbArrowsDiff, TbAlarm } from "react-icons/tb";
import { Dropdown, LargeBtn } from "@components";
import blackStone from "@assets/images/blackStone.svg";
import whiteStone from "@assets/images/whiteStone.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/recoil/user/atoms";
import { gomokuState } from "@/recoil/gomoku/atoms";
import useCheckUserAuth from "@/hooks/useCheckUserAuth";
import { SettingRow } from ".";
import click from "@assets/audios/click.mp3";
import hover from "@assets/audios/hover.mp3";

function GomokuSetting({ onClick }: { onClick(): void }) {
  const user = useRecoilValue(userState);
  const [setting, setSetting] = useRecoilState(gomokuState);

  // 시간설정
  const streamerTimeValues: number[] = [-1, 10, 30, 60];
  const viewerTimeValues: number[] = [10, 15, 20, 30];
  const setStreamerTime = (value: number) => {
    setSetting({ ...setting, streamerTime: value });
  };
  const setViewerTime = (value: number) => {
    setSetting({ ...setting, viewerTime: value });
  };

  useCheckUserAuth();

  const clickSound = new Audio(click);
  const hoverSound = new Audio(hover);

  // 색 서로 바꾸기
  const switchColors = () => {
    setSetting((prevSetting) => {
      const newSetting = {
        ...prevSetting,
        streamerColor: prevSetting.viewerColor,
        viewerColor: prevSetting.streamerColor,
      };
      return newSetting;
    });
    clickSound.play();
  };

  return (
    <StyledGomokuSetting>
      <h1 css={{ ...textStyles.title1 }}>{`게임설정`}</h1>
      <div
        css={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBlock: "48px 16px",
        }}
      >
        <h2
          css={{
            width: "210px",
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            animation: `popIn 1s 0s both`,
            ...textStyles.title2,
          }}
        >
          {user.nickname}
        </h2>
        <img
          css={{
            animation: `breath 1s alternate ease-in-out infinite`,
          }}
          src={vs}
        />
        <h2
          css={{
            width: "210px",
            textAlign: "center",
            animation: `popIn 1s 0.3s both`,
            ...textStyles.title2,
          }}
        >
          {`시청자`}
        </h2>
      </div>
      <SettingRow
        left={
          <img
            onMouseEnter={() => hoverSound.play()}
            onMouseLeave={() => {
              hoverSound.pause();
              hoverSound.currentTime = 0;
            }}
            onClick={() => switchColors()}
            css={{
              cursor: "pointer",
              transition: `all, 0.3s`,
              ":hover": { transform: `scale(1.1)` },
            }}
            src={setting.streamerColor === 1 ? blackStone : whiteStone}
          />
        }
        icon={TbArrowsDiff}
        label={`선공`}
        right={
          <img
            onMouseEnter={() => hoverSound.play()}
            onMouseLeave={() => {
              hoverSound.pause();
              hoverSound.currentTime = 0;
            }}
            onClick={switchColors}
            css={{
              cursor: "pointer",
              transition: `all, 0.3s`,
              ":hover": { transform: `scale(1.1)` },
            }}
            src={setting.viewerColor === 1 ? blackStone : whiteStone}
          />
        }
        onClick={switchColors}
      />
      <SettingRow
        left={
          <div
            css={{
              width: "210px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Dropdown
              selectedValue={setting.streamerTime}
              values={streamerTimeValues}
              handleSelectChange={setStreamerTime}
            ></Dropdown>
          </div>
        }
        icon={TbAlarm}
        label={`제한시간`}
        right={
          <div
            css={{
              width: "210px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Dropdown
              selectedValue={setting.viewerTime}
              values={viewerTimeValues}
              handleSelectChange={setViewerTime}
            ></Dropdown>
          </div>
        }
      />
      <LargeBtn
        label="게임시작!"
        onClick={() => {
          onClick();
        }}
      />
    </StyledGomokuSetting>
  );
}

export default GomokuSetting;

const StyledGomokuSetting = styled.section`
  width: 720px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
