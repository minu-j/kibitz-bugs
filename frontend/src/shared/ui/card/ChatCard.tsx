import { colorStyles } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { IMessage } from "@/shared/types";
import Card from "./Card";
import ChatIconTwitch from "./chat_icon_twitch.svg";
import ChatIconChzzk from "./chat_icon_chzzk.svg";
import ChatIconSoop from "./chat_icon_soop.svg";
import ChatIconYoutube from "./chat_icon_youtube.svg";

function ChatCard({ chatQueue }: { chatQueue: IMessage[] }) {
  const { t } = useTranslation();
  return (
    <Card>
      <div
        css={{
          padding: "8px 12px",
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
            {msg.provider && (
              <img
                css={{
                  width: 18,
                  height: 18,
                  marginRight: 4,
                  marginTop: -2,
                }}
                src={
                  msg.provider === "twitch"
                    ? ChatIconTwitch
                    : msg.provider === "chzzk"
                    ? ChatIconChzzk
                    : msg.provider === "soop"
                    ? ChatIconSoop
                    : msg.provider === "youtube"
                    ? ChatIconYoutube
                    : ""
                }
                alt={msg.provider}
              />
            )}
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
              {msg.name}:
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
              {`${msg.content}`}
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
                  ? "✓ " + t("components.chat card.voted")
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
