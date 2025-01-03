import { atom } from "recoil";
import { IMessage } from "@/shared/types";

export const chatQueueState = atom<IMessage[]>({
  key: "chatQueueState",
  default: [],
});
