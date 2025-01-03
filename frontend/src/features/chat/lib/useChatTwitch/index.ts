import { processCoord } from "@/entities/game";
import { usePushChatQueue } from "../..";
import tmi from "tmi.js";
import { useEffect } from "react";
import { type TAddVote } from "../useChatVote";
import { userState } from "@/entities/auth";
import { useRecoilValue } from "recoil";
import { chatLogger } from "../chatLogger";

function useChatTwitch(addVote?: TAddVote) {
  const pushChatQueue = usePushChatQueue();
  const user = useRecoilValue(userState);

  const onMessageHandler = (
    _: string,
    user: tmi.ChatUserstate,
    msg: string,
    self: boolean,
  ) => {
    if (self) {
      return;
    }

    const status = addVote
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

  useEffect(() => {
    if (!user.id) return;
    const opts = {
      identity: {
        username: "gomoku_bot",
        password: user.accessToken ?? "",
      },
      channels: [user.name ?? ""],
    };
    const c = new tmi.client(opts);
    c.on("message", onMessageHandler);
    c.on("connected", onConnectedHandler);

    c.connect();

    return () => {
      c.disconnect();
    };
  }, [user.id]);
}

export default useChatTwitch;
