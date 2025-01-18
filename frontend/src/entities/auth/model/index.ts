import { create } from "zustand";

export interface TUser {
  id: string;
  name: string | null;
  nickname: string;
  imgUrl: string;
  accessToken: string;
  chatChannelId?: string;
}

export interface TUsersByProvider {
  chzzk: TUser | null;
  soop: TUser | null;
  twitch: TUser | null;
}

interface TUserStore {
  user: TUsersByProvider;
  setChzzkUser: (user: TUser) => void;
  setSoopUser: (user: TUser) => void;
  setTwitchUser: (user: TUser) => void;
  getUser: () => TUser | null;
  getIsLogin: () => boolean;
  getIsChzzkLogin: () => boolean;
  getIsTwitchLogin: () => boolean;
  getIsSoopLogin: () => boolean;
}

const recentProvider = localStorage.getItem("recent_provider");

export const userStore = create<TUserStore>((set, get) => ({
  user: {
    chzzk: null,
    twitch: null,
    soop: null,
  },
  setChzzkUser: (user: TUser) => set({ user: { ...get().user, chzzk: user } }),
  setSoopUser: (user: TUser) => set({ user: { ...get().user, soop: user } }),
  setTwitchUser: (user: TUser) =>
    set({ user: { ...get().user, twitch: user } }),
  getUser: () => {
    if (recentProvider === "twitch") return get().user.twitch;
    if (recentProvider === "soop") return get().user.soop;
    if (recentProvider === "chzzk") return get().user.chzzk;
    return (
      (get().user.chzzk && get().user.chzzk) ||
      (get().user.soop && get().user.soop) ||
      (get().user.twitch && get().user.twitch)
    );
  },
  getIsLogin: () => {
    return !!get().user.chzzk || !!get().user.twitch || !!get().user.soop;
  },
  getIsChzzkLogin: () => {
    return !!get().user.chzzk;
  },
  getIsTwitchLogin: () => {
    return !!get().user.twitch;
  },
  getIsSoopLogin: () => {
    return !!get().user.soop;
  },
}));
