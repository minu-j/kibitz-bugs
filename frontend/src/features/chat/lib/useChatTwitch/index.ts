import { processCoord } from "@/entities/game";
import { usePushChatQueue } from "../..";
import tmi from "tmi.js";
import { useRef, useEffect } from "react";
import { type TAddVote } from "../useChatVote";
import { useRecoilValue } from "recoil";
import { chatLogger } from "../chatLogger";
import { gomokuIsPlayState } from "@/entities/game/model/gomoku";
import { userStore } from "@/entities/auth";

function useChatTwitch(addVote: TAddVote) {
  const { user, getIsLogin } = userStore();

  const chat = useRef<tmi.Client | null>(null);
  const pushChatQueue = usePushChatQueue();

  const isPlay = useRecoilValue(gomokuIsPlayState);
  const isPlayRef = useRef(isPlay);
  useEffect(() => {
    isPlayRef.current = isPlay;
  }, [isPlay]);

  const onMessageHandler = (
    _: string,
    user: tmi.ChatUserstate,
    msg: string,
    self: boolean,
  ) => {
    if (self) {
      return;
    }
    const status = isPlayRef.current
      ? addVote(user["user-id"]!, processCoord(msg))
      : "normal";

    pushChatQueue({
      name: user["display-name"],
      content: msg.trim(),
      status,
      provider: "twitch",
    });
  };

  const onConnectedHandler = (addr: string, port: number) => {
    chatLogger("twitch", `connected: ${addr}:${port}`);
  };

  const onCloseHandler = () => {
    chatLogger("twitch", "disconnected");
    cleanup();
    window.alert("Twitch 채팅 연결이 끊어졌습니다. 다시 로그인해주세요.");
    window.location.href = "/";
  };

  const init = () => {
    if (!getIsLogin() || !user.twitch?.accessToken) return;
    const opts = {
      identity: {
        username: "kibitz-bugs",
        password: user.twitch.accessToken,
      },
      channels: [user.twitch.name ?? ""],
    };
    chat.current = new tmi.client(opts);
    chat.current.on("message", onMessageHandler);
    chat.current.on("connected", onConnectedHandler);
    chat.current.on("disconnected", onCloseHandler);
    chat.current.connect();
  };

  const cleanup = () => {
    if (!chat.current) return;
    chat.current.removeListener("message", onMessageHandler);
    chat.current.removeListener("connected", onConnectedHandler);
    chat.current.removeListener("disconnected", onCloseHandler);
    chat.current.disconnect();
    chat.current = null;
  };

  return { init, cleanup };
}

export default useChatTwitch;
