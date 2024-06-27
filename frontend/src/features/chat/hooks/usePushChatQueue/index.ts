import { useSetRecoilState } from "recoil";
import {chatQueueState} from "@/features/chat/recoil/chat/atoms.ts";
import {IMessage} from "@/features/chat/recoil/chat";

export default function () {
  const MAX_CHAT_Q_LENGTH: number = 10;
  const setChatQueue = useSetRecoilState(chatQueueState);

  const pushChatQueue = (chat: IMessage) => {
    setChatQueue((prevChatQueue) => {
      const newChatQueue = [...prevChatQueue];
      if (newChatQueue.length > MAX_CHAT_Q_LENGTH) {
        newChatQueue.splice(0, 1);
      }
      return [...newChatQueue, chat];
    });
  };
  return pushChatQueue;
}