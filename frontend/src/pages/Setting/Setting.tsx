import styled from "@emotion/styled";
import { textStyles } from "@styles";
import vs from "@assets/images/vs.svg";
import { TbArrowsDiff, TbAlarm } from "react-icons/tb";
import { LargeBtn } from "@components";
import { useNavigate } from "react-router-dom";
import { SettingRow } from "./components";
import blackStone from "@assets/images/blackStone.svg";
import whiteStone from "@assets/images/whiteStone.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/recoil/user/atoms";
import { gomokuState } from "@/recoil/gomoku/atoms";
import Dropdown from "@/components/Dropdown";
import useCheckUserAuth from "@/hooks/useCheckUserAuth";

function Setting() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [setting, setSetting] = useRecoilState(gomokuState);

  // 시간설정
  const streamerTimeValues: number[] = [-1, 100, 300, 600];
  const viewerTimeValues: number[] = [10, 50, 100, 200];
  const setStreamerTime = (value: number) => {
    setSetting({ ...setting, streamerTime: value });
  };
  const setViewerTime = (value: number) => {
    setSetting({ ...setting, viewerTime: value });
  };

  useCheckUserAuth();

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
  };

  return (
    <StyledSetting>
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
          {user.name}
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
            onClick={() => {
              switchColors();
            }}
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
            onClick={() => {
              switchColors();
            }}
            css={{
              cursor: "pointer",
              transition: `all, 0.3s`,
              ":hover": { transform: `scale(1.1)` },
            }}
            src={setting.viewerColor === 1 ? blackStone : whiteStone}
          />
        }
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
          navigate("/gomoku");
        }}
      />
    </StyledSetting>
  );
}

export default Setting;

const StyledSetting = styled.main`
  width: 1280px;
  height: 720px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
