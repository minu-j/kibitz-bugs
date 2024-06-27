import { atom } from "recoil";
import {TUserState} from "@/features/auth/recoil/user/type";

export const userState = atom<TUserState>({
  key: "userState",
  default: {
    id: undefined,
    name: undefined,
    nickname: undefined,
    imgUrl: undefined,
    accessToken: undefined,
  },
});
