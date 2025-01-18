import { processCoord } from "@/entities/game";
import { usePushChatQueue } from "../..";
import { useEffect, useRef } from "react";
import { type TAddVote } from "../useChatVote";
import { chatLogger } from "../chatLogger";
import { gomokuIsPlayState } from "@/entities/game/model/gomoku";
import { userStore } from "@/entities/auth";
import { useRecoilValue } from "recoil";

interface IChzzkMessage {
  svcid: string;
  cid: string;
  mbrCnt: number;
  uid: string;
  profile: string;
  msg: string;
  msgTypeCode: number;
  msgStatusType: string;
  extras: string;
  ctime: number;
  utime: number;
  msgTid: null;
  msgTime: number;
}

const CHZZK_WS_URL = "wss://kr-ss1.chat.naver.com/chat";

function useChatChzzk(addVote: TAddVote) {
  const { getIsLogin, user } = userStore();

  const chat = useRef<WebSocket | null>(null);
  const pushChatQueue = usePushChatQueue();

  const isPlay = useRecoilValue(gomokuIsPlayState);
  const isPlayRef = useRef(isPlay);
  useEffect(() => {
    isPlayRef.current = isPlay;
  }, [isPlay]);

  const sendConnectionMessage = () => {
    if (!chat.current) return;
    const connectionMessage = {
      ver: "2",
      cmd: 100,
      svcid: "game",
      cid: user.chzzk?.chatChannelId,
      bdy: {
        uid: null,
        devType: 2001,
        accTkn: user.chzzk?.accessToken,
        auth: "READ",
      },
      tid: 1,
    };
    chat.current.send(JSON.stringify(connectionMessage));
    chatLogger("chzzk", "try to connect...");
  };

  const onConnectedHandler = async () => {
    sendConnectionMessage();
  };

  const messageHandler = (msg: IChzzkMessage) => {
    const status = isPlayRef.current
      ? addVote(msg.uid, processCoord(msg.msg))
      : "normal";

    pushChatQueue({
      name: JSON.parse(msg.profile).nickname,
      content: msg.msg,
      status,
      provider: "chzzk",
    });
  };

  const onMessageHandler = (event: MessageEvent) => {
    if (!chat.current) return;
    const data = JSON.parse(event.data);
    switch (data.cmd) {
      case 10100: // Connection
        chatLogger("chzzk", `connected : ${data.bdy.sid}`);
        break;
      case 0: // Pong
        chat.current.send(JSON.stringify({ ver: 2, cmd: 10000 }));
        break;
      case 94008: // Ignore clean bot message
        break;
      default:
        if (!data.bdy) return;
        data.bdy.forEach((msg: IChzzkMessage) => {
          switch (data.cmd) {
            case 93101: // default message
              messageHandler(msg);
              break;
            case 93102: // Ignore donation message
              break;
            case 11: // Ignore subscription message
              break;
            default: // Ignore unknown message
              break;
          }
        });
    }
  };

  const onCloseHandler = () => {
    chatLogger("chzzk", "disconnected");
    chatLogger("chzzk", "try to reconnect...");
    cleanup();
    init();
  };

  const init = () => {
    if (!getIsLogin() || !user.chzzk?.accessToken) return;
    if (!chat.current) {
      chat.current = new WebSocket(CHZZK_WS_URL);
      chat.current?.addEventListener("open", onConnectedHandler);
      chat.current?.addEventListener("message", onMessageHandler);
      chat.current?.addEventListener("close", onCloseHandler);
    }
  };

  const cleanup = () => {
    if (chat.current) {
      chat.current.close();
      chat.current = null;
    }
  };

  return { init, cleanup };
}

export default useChatChzzk;
