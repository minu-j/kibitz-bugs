import { processCoord } from "@/entities/game";
import { usePushChatQueue } from "../..";
import { useEffect, useRef } from "react";
import { type TAddVote } from "../useChatVote";
import { userState } from "@/entities/auth";
import { useRecoilValue } from "recoil";
import { chatLogger } from "../chatLogger";

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
const CHZZK_CHANNEL_ID = "";
const CHZZK_CHANNEL_ACCESS_TOKEN = "";

function useChatChzzk(addVote?: TAddVote) {
  const pushChatQueue = usePushChatQueue();
  const user = useRecoilValue(userState);

  const chatSocket = useRef<WebSocket | null>(null);

  const cleanup = () => {
    if (chatSocket.current) {
      chatSocket.current.close();
      chatSocket.current = null;
    }
  };

  const sendConnectionMessage = () => {
    if (!chatSocket.current) return;
    const connectionMessage = {
      ver: "2",
      cmd: 100,
      svcid: "game",
      cid: CHZZK_CHANNEL_ID,
      bdy: {
        uid: null,
        devType: 2001,
        accTkn: CHZZK_CHANNEL_ACCESS_TOKEN,
        auth: "READ",
      },
      tid: 1,
    };
    chatSocket.current.send(JSON.stringify(connectionMessage));
    chatLogger("chzzk", "try to connect...");
  };

  const onConnectedHandler = async () => {
    sendConnectionMessage();
  };

  const messageHandler = (msg: IChzzkMessage) => {
    const status = addVote ? addVote(msg.uid, processCoord(msg.msg)) : "normal";

    pushChatQueue({
      name: JSON.parse(msg.profile).nickname,
      content: msg.msg,
      status,
      provider: "chzzk",
    });
  };

  const onMessageHandler = (event: MessageEvent) => {
    if (!chatSocket.current) return;
    const data = JSON.parse(event.data);
    switch (data.cmd) {
      case 10100: // Connection
        chatLogger("chzzk", `connected : ${data.bdy.sid}`);
        break;
      case 0: // Pong
        chatSocket.current.send(JSON.stringify({ ver: 2, cmd: 10000 }));
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

  useEffect(() => {
    if (!user.id) return;
    if (!chatSocket.current) {
      chatSocket.current = new WebSocket(CHZZK_WS_URL);
      chatSocket.current?.addEventListener("open", onConnectedHandler);
      chatSocket.current?.addEventListener("message", onMessageHandler);
    }
    return cleanup;
  }, [user.id]);
}

export default useChatChzzk;
