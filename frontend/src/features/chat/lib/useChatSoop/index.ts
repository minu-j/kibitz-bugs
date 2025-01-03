import { userState } from "@/entities/auth";
import { type TAddVote } from "../useChatVote";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { chatLogger } from "../chatLogger";
import { processCoord } from "@/entities/game";
import usePushChatQueue from "../usePushChatQueue";

declare global {
  interface Window {
    SOOP: {
      ChatSDK: new (clientId: string, clientSecret: string) => any;
    };
  }
}

interface ISoopMessage {
  userId: string;
  userNickname: string;
  userStatus: {
    isBJ: boolean;
    isManager: boolean;
    isGuest: boolean;
    isTopFan: boolean;
    isFan: boolean;
    isFollower: boolean;
    isSupporter: boolean;
    hasAppliedQuickview: boolean;
    isTranslatable: boolean;
  };
  subscriptionMonth: number;
  message: string;
  followMonths: string;
  color: string;
}

const CLIENT_ID = import.meta.env.VITE_SOOP_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SOOP_CLIENT_SECRET;

const SOOP_CHANNEL_ACCESS_TOKEN = "";

function useChatSoop(addVote?: TAddVote) {
  const pushChatQueue = usePushChatQueue();

  const user = useRecoilValue(userState);
  const chat = useRef<any | null>(null);

  const messageHandler = (msg: ISoopMessage) => {
    const status = addVote
      ? addVote(msg.userId, processCoord(msg.message))
      : "normal";

    pushChatQueue({
      name: msg.userNickname,
      content: msg.message,
      status,
      provider: "soop",
    });
  };

  const initChat = () => {
    const ChatSDK = window.SOOP.ChatSDK;
    if (!ChatSDK) {
      console.error("ChatSDK is not available");
      return;
    }
    chat.current = new ChatSDK(CLIENT_ID, CLIENT_SECRET);
    chat.current.setAuth(SOOP_CHANNEL_ACCESS_TOKEN);

    console.log(1);
    chat.current
      .connect()
      .then((res: boolean) => {
        console.log(2);
        chatLogger("soop", `connected : ${res}`);
        console.log(3);
        chat.current.handleMessageReceived((action: any, message: any) => {
          switch (action) {
            case "MESSAGE":
              messageHandler(message);
              break;
            default:
              break;
          }
        });
        console.log(4);
        chat.current.handleError((code: any, message: any) => {
          console.log("SDK ERROR ::", code, message);
        });
        console.log(5);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const cleanup = () => {
    console.log("cleanup", chat.current);
    if (chat.current) {
      chat.current.disconnect();
      chat.current = null;
    }
  };

  useEffect(() => {
    if (!user.id) return;
    initChat();

    return () => {
      cleanup();
    };
  }, [user.id]);
}

export default useChatSoop;
