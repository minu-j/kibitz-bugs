import styled from "@emotion/styled";

import { vs, blackStone, whiteStone } from "@/shared/resource/images";
import { TbArrowsDiff, TbAlarm } from "react-icons/tb";
import { useRecoilState, useRecoilValue } from "recoil";
import { SettingRow } from ".";
import { click, hover } from "@/shared/resource/audios";
import { useTranslation } from "react-i18next";
import { useFullscreen } from "@/shared/lib";
import { useCheckUserAuth, userState } from "@/entities/auth";
import { gomokuState } from "@/entities/game";
import { Dropdown, LargeBtn, SmallBtn, textStyles } from "@/shared/ui";
import { SelectLocales } from "@/shared/i18n";

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

  const fullScreen = useFullscreen();

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
        <h2
          css={{
            width: "210px",
            textAlign: "center",
            animation: `popIn 1s 0.3s both`,
            ...textStyles.title2,
          }}
        >
          {t("viewers")}
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
        css={{ display: "flex", width: 500, justifyContent: "space-between" }}
      >
        <div
          css={{
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <SmallBtn
            label={
              fullScreen.isFullscreen
                ? t("pages.setting.window")
                : t("pages.setting.fullscreen")
            }
            onClick={() => fullScreen.toggleFullscreen()}
          ></SmallBtn>
        </div>
        <LargeBtn
          label={t("pages.setting.start")}
          onClick={() => {
            onClick();
          }}
        />
      </div>
      <SelectLocales />
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
