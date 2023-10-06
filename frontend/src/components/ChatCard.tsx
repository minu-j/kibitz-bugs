import { colorStyles } from "@/styles";
import { Card } from ".";
import { IMessage } from "@/recoil/chat/atoms";

function ChatCard({ chatQueue }: { chatQueue: IMessage[] }) {
  return (
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
                maxWidth: 110,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {msg.name}
            </span>
            <span
              css={{
                wordBreak: "break-all",
                color:
                  msg.status === "success"
                    ? "green"
                    : msg.status === "error"
                    ? colorStyles.lightGray
                    : "",
                fontWeight: msg.status === "success" ? 900 : "",
              }}
            >
              {`: ${msg.content}`}
              <span
                css={{
                  fontSize: 12,
                  color:
                    msg.status === "success"
                      ? "green"
                      : msg.status === "error"
                      ? colorStyles.danger
                      : "",
                  fontWeight: 400,
                  marginLeft: 4,
                }}
              >
                {msg.status === "success"
                  ? "✓ 투표됨"
                  : msg.status === "error"
                  ? "x"
                  : ""}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ChatCard;
