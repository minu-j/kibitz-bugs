import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { ChatCard, colorStyles } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { chatQueueState } from "../model";
import { gomokuNowPlayerState } from "@/entities/game";
import { gomokuResultState } from "@/entities/game";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

function GomokuChatCard() {
  const { pathname } = useLocation();
  const isGomoku = useMemo(() => pathname.includes("gomoku"), [pathname]);

  const chatQueue = useRecoilValue(chatQueueState);
  const result = useRecoilValue(gomokuResultState);
  const nowPlayer = useRecoilValue(gomokuNowPlayerState);

  return (
    <StyledGomokuChatCard>
      {isGomoku && !result && nowPlayer === 2 ? <NowVoteFlag /> : null}
      <ChatCard chatQueue={chatQueue} />
    </StyledGomokuChatCard>
  );
}

export default GomokuChatCard;

const StyledGomokuChatCard = styled.section`
  padding: 8px;
`;

const NowVoteFlag = () => {
  const { t } = useTranslation();
  return (
    <div
      css={{
        margin: 10,
        borderRadius: `0px 10px 0px 10px`,
        color: colorStyles.danger,
        fontWeight: 900,
        backgroundColor: "black",
        padding: 10,
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        css={{
          width: 8,
          height: 8,
          borderRadius: 8,
          backgroundColor: colorStyles.danger,
          marginRight: 4,
          animation: `flicker 0.6s alternate infinite`,
        }}
      ></div>
      {t("pages.gomoku.vote now")}
    </div>
  );
};
