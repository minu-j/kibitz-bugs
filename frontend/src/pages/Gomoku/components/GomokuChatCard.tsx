import styled from "@emotion/styled";
import { Card } from "@components";
import tmi from "tmi.js";
import { userState } from "@/recoil/user/atoms";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

interface IMessage {
  name: string | undefined;
  content: string;
}

function GomokuChatCard() {
  const user = useRecoilValue(userState);
  const MAX_CHAT_Q_LENGTH: number = 15;
  const [chatQueue, setChatQueue] = useState<IMessage[]>([]);

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
      if (prevChatQueue.length > MAX_CHAT_Q_LENGTH) {
        prevChatQueue.splice(0, 1);
      }
      return [
        ...prevChatQueue,
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
      channels: [user.name ?? ""],
    };
    // Create a client with our options
    const c = new tmi.client(opts);
    // Register our event handlers (defined below)
    c.on("message", onMessageHandler);
    c.on("connected", onConnectedHandler);

    // Connect to Twitch:
    c.connect();
  }, []);

  return (
    <StyledGomokuChatCard>
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
    </StyledGomokuChatCard>
  );
}

export default GomokuChatCard;

const StyledGomokuChatCard = styled.section`
  padding: 8px;
`;
