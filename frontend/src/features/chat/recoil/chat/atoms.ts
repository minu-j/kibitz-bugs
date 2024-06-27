import { atom } from "recoil";
import {IMessage} from "@/features/chat/recoil/chat/index";

export const chatQueueState = atom<IMessage[]>({
  key: "chatQueueState",
  default: [],
});
