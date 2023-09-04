import styled from "@emotion/styled";
import { Card } from "@components";
import tmi from "tmi.js";
import { userState } from "@/recoil/user/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useRef } from "react";
import { processCoord } from "@/utils/processCoord";
import {
  gomokuBoardState,
  gomokuResultState,
  gomokuVoteState,
} from "@/recoil/gomoku/atoms";
import { str2numCoord } from "@/utils/str2numCoord";
import { chatQueueState } from "@/recoil/chat/atoms";

function GomokuChatCard() {
  const user = useRecoilValue(userState);
  const MAX_CHAT_Q_LENGTH: number = 15;
  const [chatQueue, setChatQueue] = useRecoilState(chatQueueState);
  const setVote = useSetRecoilState(gomokuVoteState);

  const board = useRecoilValue(gomokuBoardState);
  const boardRef = useRef(board);
  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  const result = useRecoilValue(gomokuResultState);
  const resultRef = useRef(result);
  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  const addVote = (coord: string) => {
    if (coord && !resultRef.current) {
      const [i, j] = str2numCoord(coord);
      // 해당 보드에 돌이 없어야 투표에 반영
      if (
        !boardRef.current.board[i][j] &&
        !boardRef.current.forbidden.has(`${i} ${j}`)
      ) {
        setVote((prevVote) => {
          const newCount = prevVote.count;
          if (newCount.has(coord)) {
            newCount.set(coord, newCount.get(coord)! + 1);
          } else {
            newCount.set(coord, 1);
          }
          const newTotal = prevVote.total;
          return { count: newCount, total: newTotal + 1 };
        });
      }
    }
  };

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

    addVote(processCoord(msg));

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
