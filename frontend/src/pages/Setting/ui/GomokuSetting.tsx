import styled from "@emotion/styled";

import { vs, blackStone, whiteStone } from "@/shared/resource/images";
import { TbArrowsDiff, TbAlarm } from "react-icons/tb";
import { useRecoilState, useRecoilValue } from "recoil";
import { SettingRow } from ".";
import { click, hover } from "@/shared/resource/audios";
import { useTranslation } from "react-i18next";
import { useCheckUserAuth, userState } from "@/entities/auth";
import { gomokuState } from "@/entities/game";
import { Dropdown, LargeBtn, textStyles } from "@/shared/ui";

const streamerTimeValues: number[] = [
  -1, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
];
const viewerTimeValues: number[] = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

const clickSound = new Audio(click);
const hoverSound = new Audio(hover);

function GomokuSetting({ onClick }: { onClick(): void }) {
  const { t } = useTranslation();
  const user = useRecoilValue(userState);
  const [setting, setSetting] = useRecoilState(gomokuState);

  // 시간설정
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
    clickSound.play();
  };

  return (
    <StyledGomokuSetting>
      <h1 css={{ ...textStyles.title1 }}>{t("pages.setting.title")}</h1>
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
        <div css={{ width: "210px", textAlign: "center" }}>
          <input
            css={{
              animation: `popIn 1s 0.2s both`,
              width: "180px",
              height: "52px",
              ...textStyles.title2,
              textAlign: "center",
              border: `4px dashed #b8b8b9`,
              borderRadius: "8px",
              padding: "0 8px",
              backgroundColor: "transparent",
            }}
            type="text"
            placeholder={t("viewers")}
            onChange={(e) => {
              setSetting({ ...setting, viewerNickname: e.target.value });
            }}
            value={setting.viewerNickname}
          />
        </div>
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
        label={t("pages.setting.first")}
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
        label={t("pages.setting.timeout")}
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
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBlock: 20,
          gap: 16,
          flexDirection: "column",
        }}
      >
        <LargeBtn
          label={t("pages.setting.start")}
          onClick={() => {
            onClick();
          }}
        />
      </div>
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
