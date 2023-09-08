import { atom } from "recoil";

interface IMessage {
  name: string | undefined;
  content: string;
  status: "success" | "error" | "normal";
}

export const chatQueueState = atom<IMessage[]>({
  key: "chatQueueState",
  default: [],
});
