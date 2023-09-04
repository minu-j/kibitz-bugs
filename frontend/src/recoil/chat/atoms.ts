import { atom } from "recoil";

interface IMessage {
  name: string | undefined;
  content: string;
}

export const chatQueueState = atom<IMessage[]>({
  key: "chatQueueState",
  default: [],
});
