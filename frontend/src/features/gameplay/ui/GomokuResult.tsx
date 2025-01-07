import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { logo } from "@/shared/resource/images";
import { textStyles } from "@/shared/ui";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { userStore } from "@/entities/auth";
import { postGame, gomokuResultState, gomokuState } from "@/entities/game";
import { win } from "@/shared/resource/audios";

const winSound = new Audio(win);

function GomokuResult() {
  const { t } = useTranslation();
  const result = useRecoilValue(gomokuResultState);
  const { user } = userStore();
  const setting = useRecoilValue(gomokuState);

  useEffect(() => {
    winSound.play();
    // DB에 게임 결과 전송
    if (user.id && user.name && user.nickname && user.imgUrl)
      postGame({
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        imgUrl: user.imgUrl,
        win: result === 1 ? true : false,
      });
  }, []);

  return (
    <StyledGomokuResultCard>
      <iframe
        css={{
          zIndex: -5,
          position: "absolute",
          height: 300,
          bottom: -70,
        }}
        src="https://embed.lottiefiles.com/animation/32585"
      ></iframe>
      <img css={{ width: 160 }} src={logo} />
      <h2
        css={{
          marginBlock: 24,
          ...textStyles.title2,
          animation: `popIn 0.3s 0s both`,
        }}
      >
        {t("pages.gomoku.winner")}
      </h2>
      <h3
        css={{
          ...textStyles.title1,
          animation: `popIn 1s 0.3s both`,
          maxWidth: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {result === 1
          ? `${user.nickname}`
          : setting.viewerNickname
          ? setting.viewerNickname
          : t("viewers")}
      </h3>
    </StyledGomokuResultCard>
  );
}

export default GomokuResult;

const StyledGomokuResultCard = styled.section`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
