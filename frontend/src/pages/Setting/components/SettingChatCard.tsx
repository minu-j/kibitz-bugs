import styled from "@emotion/styled";
import { Card } from "@components";
import tmi from "tmi.js";
import { userState } from "@/recoil/user/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { chatQueueState } from "@/recoil/chat/atoms";

function SettingChatCard() {
  const user = useRecoilValue(userState);
  const MAX_CHAT_Q_LENGTH: number = 15;
  const [chatQueue, setChatQueue] = useRecoilState(chatQueueState);

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

    setChatQueue((prevChatQueue) => {
      const newChatQueue = [...prevChatQueue];
      if (newChatQueue.length > MAX_CHAT_Q_LENGTH) {
        newChatQueue.splice(0, 1);
      }
      return [
        ...newChatQueue,
        {
          name: user["display-name"],
          content: msg.trim(),
        },
      ];
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
      channels: [user.nickname ?? ""],
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
      <Card>
        <div
          css={{
            padding: 16,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            overflow: "hidden",
          }}
        >
          {chatQueue.map((msg, idx) => (
            <div
              key={`chat-key-${idx}`}
              css={{
                padding: 4,
                width: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              <span
                css={{
                  marginRight: 4,
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                {`${msg.name} :`}
              </span>
              <span
                css={{
                  wordBreak: "break-all",
                }}
              >
                {msg.content}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </StyledSettingChatCard>
  );
}

export default SettingChatCard;

const StyledSettingChatCard = styled.section`
  padding: 8px;
`;
