import { processCoord } from "@/entities/game";
import { usePushChatQueue } from "../..";
import tmi from "tmi.js";
import { useRef, useEffect } from "react";
import { type TAddVote } from "../useChatVote";
import { userState } from "@/entities/auth";
import { useRecoilValue } from "recoil";
import { chatLogger } from "../chatLogger";
import { gomokuIsPlayState } from "@/entities/game/model/gomoku";

function useChatTwitch(addVote: TAddVote) {
  const user = useRecoilValue(userState);

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

  const init = () => {
    if (!user.id || !user.accessToken) return;
    const opts = {
      identity: {
        username: "kibitz-bugs",
        password: user.accessToken,
      },
      channels: [user.name ?? ""],
    };
    chat.current = new tmi.client(opts);
    chat.current.on("message", onMessageHandler);
    chat.current.on("connected", onConnectedHandler);
    chat.current.connect();
  };

  const cleanup = () => {
    if (!chat.current) return;
    chat.current.removeListener("message", onMessageHandler);
    chat.current.removeListener("connected", onConnectedHandler);
    chat.current.disconnect();
    chat.current = null;
  };

  return { init, cleanup };
}

export default useChatTwitch;
