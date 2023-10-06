import { IMessage, chatQueueState } from "@/recoil/chat/atoms";
import { useSetRecoilState } from "recoil";

const usePushChatQueue = () => {
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
};

export default usePushChatQueue;
