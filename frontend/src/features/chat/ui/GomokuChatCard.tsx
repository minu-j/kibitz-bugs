import styled from "@emotion/styled";
import tmi from "tmi.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useRef } from "react";
import { ChatCard, colorStyles } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { userState } from "@/entities/auth";
import {
  gomokuBoardState,
  gomokuNowPlayerState,
  gomokuResultState,
  gomokuVoteState,
  str2numCoord,
  processCoord,
} from "@/entities/game";
import { chatQueueState } from "../model";
import { usePushChatQueue } from "../lib";

// 투표한 시청자 이름 관리 셋
const votedViewers = new Set();
function GomokuChatCard() {
  const user = useRecoilValue(userState);
  const setVote = useSetRecoilState(gomokuVoteState);

  const board = useRecoilValue(gomokuBoardState);
  const boardRef = useRef(board);
  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  const result = useRecoilValue(gomokuResultState);
  const resultRef = useRef(result);
  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  const nowPlayer = useRecoilValue(gomokuNowPlayerState);
  const nowPlayerRef = useRef(nowPlayer);
  useEffect(() => {
    nowPlayerRef.current = nowPlayer;
    // 시청자 차례로 넘어갈 때 투표된 아이디 초기화
    if (nowPlayer === 2) {
      votedViewers.clear();
    }
  }, [nowPlayer]);

  const addVote = (user: string, coord: string) => {
    if (coord && !resultRef.current && nowPlayerRef.current === 2) {
      const [i, j] = str2numCoord(coord);
      // 해당 보드에 돌이 없어야 투표에 반영
      if (
        !boardRef.current.board[i][j] &&
        !boardRef.current.forbidden.has(`${i} ${j}`) &&
        !votedViewers.has(user)
      ) {
        setVote((prevVote) => {
          const newCount = prevVote.count;
          if (newCount.has(coord)) {
            newCount.set(coord, newCount.get(coord)! + 1);
          } else {
            newCount.set(coord, 1);
          }
          const newTotal = prevVote.total;
          return { count: newCount, total: newTotal + 1 };
        });
        votedViewers.add(user);
        return "success";
      }
      return "error";
    }
    return "normal";
  };

  const pushChatQueue = usePushChatQueue();
  const chatQueue = useRecoilValue(chatQueueState);

  // Called every time a message comes in
  const onMessageHandler = (
    _: string,
    user: tmi.ChatUserstate,
    msg: string,
    self: boolean,
  ) => {
    if (self) {
      return;
    } // Ignore messages from the bot

    const status = addVote(user["user-id"]!, processCoord(msg));

    pushChatQueue({
      name: user["display-name"],
      content: msg.trim(),
      status: status,
    });
  };

  // Called every time the bot connects to Twitch chat
  const onConnectedHandler = (addr: string, port: number) => {
    console.log(`* 연결 성공 : ${addr}:${port}`);
  };

  useEffect(() => {
    // Define configuration options
    const opts = {
      identity: {
        username: "gomoku_bot",
        password: user.accessToken ?? "",
      },
      channels: [user.name ?? ""],
    };
    // Create a client with our options
    const c = new tmi.client(opts);
    // Register our event handlers (defined below)
    c.on("message", onMessageHandler);
    c.on("connected", onConnectedHandler);

    // Connect to Twitch:
    c.connect();

    return () => {
      c.disconnect();
    };
  }, []);

  return (
    <StyledGomokuChatCard>
      {!result && nowPlayer === 2 ? <NowVoteFlag /> : null}
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
