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
    if (recentProvider === "chzzk") return get().user.chzzk;
    if (recentProvider === "soop") return get().user.soop;
    if (recentProvider === "twitch") return get().user.twitch;
    if (get().user.chzzk) return get().user.chzzk;
    if (get().user.soop) return get().user.soop;
    if (get().user.twitch) return get().user.twitch;
    return null;
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
