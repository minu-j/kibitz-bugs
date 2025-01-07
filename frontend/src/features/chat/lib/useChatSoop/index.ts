import { userStore } from "@/entities/auth";
import { type TAddVote } from "../useChatVote";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { chatLogger } from "../chatLogger";
import { processCoord } from "@/entities/game";
import usePushChatQueue from "../usePushChatQueue";
import { gomokuIsPlayState } from "@/entities/game/model/gomoku";

type TChatSDK = {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  handleMessageReceived: (
    callback: (action: string, message: ISoopMessage) => void,
  ) => void;
  handleError: (callback: (code: string, message: string) => void) => void;
  setAuth: (token: string) => void;
};

declare global {
  interface Window {
    SOOP: {
      ChatSDK: new (clientId: string, clientSecret: string) => TChatSDK;
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

function useChatSoop(addVote: TAddVote) {
  const { getIsLogin, user } = userStore();

  const chat = useRef<TChatSDK | null>(null);
  const pushChatQueue = usePushChatQueue();

  const isPlay = useRecoilValue(gomokuIsPlayState);
  const isPlayRef = useRef(isPlay);
  useEffect(() => {
    isPlayRef.current = isPlay;
  }, [isPlay]);

  const messageHandler = (msg: ISoopMessage) => {
    const status = isPlayRef.current
      ? addVote(msg.userId, processCoord(msg.message))
      : "normal";

    pushChatQueue({
      name: msg.userNickname,
      content: msg.message,
      status,
      provider: "soop",
    });
  };

  const init = () => {
    if (!getIsLogin() || !user.soop?.accessToken) return;
    const ChatSDK = window.SOOP.ChatSDK;
    if (!ChatSDK) {
      console.error("ChatSDK is not available");
      return;
    }
    chat.current = new ChatSDK(CLIENT_ID, CLIENT_SECRET);
    chat.current.setAuth(user.soop?.accessToken);

    chat.current
      .connect()
      .then((res: boolean) => {
        chatLogger("soop", `connected : ${res}`);
        chat.current?.handleMessageReceived(
          (action: string, message: ISoopMessage) => {
            switch (action) {
              case "MESSAGE":
                messageHandler(message);
                break;
              default:
                break;
            }
          },
        );
        chat.current?.handleError((code: string, message: string) => {
          console.log("SDK ERROR ::", code, message);
        });
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  const cleanup = () => {
    if (chat.current) {
      chat.current.disconnect();
      chat.current = null;
    }
  };

  return { init, cleanup };
}

export default useChatSoop;
