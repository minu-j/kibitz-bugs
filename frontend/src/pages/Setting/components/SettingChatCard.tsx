import styled from "@emotion/styled";
import { ChatCard } from "@components";
import tmi from "tmi.js";
import { userState } from "@/recoil/user/atoms";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import usePushChatQueue from "@/hooks/usePushChatQueue";
import { chatQueueState } from "@/recoil/chat/atoms";

function SettingChatCard() {
  const user = useRecoilValue(userState);
  const pushChatQueue = usePushChatQueue();
  const chatQueue = useRecoilValue(chatQueueState);

  // Called every time a message comes in
  const onMessageHandler = (
    channel: string,
    user: tmi.ChatUserstate,
    msg: string,
    self: boolean,
  ) => {
    if (self) {
      return;
    } // Ignore messages from the bot
    pushChatQueue({
      name: user["display-name"],
      content: msg.trim(),
      status: "normal",
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
    <StyledSettingChatCard>
      <ChatCard chatQueue={chatQueue} />
    </StyledSettingChatCard>
  );
}

export default SettingChatCard;

const StyledSettingChatCard = styled.section`
  padding: 8px;
`;
