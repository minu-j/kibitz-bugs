import { atom } from "recoil";

interface TUserState {
  id: string | undefined;
  name: string | undefined;
  nickname: string | undefined;
  imgUrl: string | undefined;
  accessToken: string | undefined;
}

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
