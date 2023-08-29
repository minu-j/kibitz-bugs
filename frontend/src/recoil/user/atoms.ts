import { atom } from "recoil";

interface TUserState {
  name: string | undefined;
  id: string | undefined;
  email: string | undefined;
  imgUrl: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export const userState = atom<TUserState>({
  key: "userState",
  default: {
    name: undefined,
    id: undefined,
    email: undefined,
    imgUrl: undefined,
    accessToken: undefined,
    refreshToken: undefined,
  },
});
