export interface IMessage {
  name: string | undefined;
  content: string;
  status: "success" | "error" | "normal";
  provider?: TProvider;
}

export type TProvider = "twitch" | "chzzk" | "soop" | "youtube";
