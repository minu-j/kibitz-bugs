import { TProvider } from "@/shared/types/chat";

type TLogStatus = "error" | "warn" | "info" | "debug";

const logStyles = {
  error: "color: #FF0000;",
  warn: "color: #FFFF00;",
  info: "color: #FFFFFF;",
  debug: "color: #008000;",
};

const providerStyles = {
  twitch: "color: #000000; background: #9246FF; font-weight: bold;",
  chzzk: "color: #00FFA3; background: #000000; font-weight: bold;",
  soop: "color: #0387FE; background: #17191C; font-weight: bold;",
  youtube: "color: #000000; background: #FFFFFF; font-weight: bold;",
};

function chatLogger(provider: TProvider, msg: string, status?: TLogStatus) {
  switch (provider) {
    case "twitch":
      console.log(
        `%c Twitch ` + `%c ${msg}`,
        providerStyles.twitch,
        logStyles[status || "info"],
      );
      break;
    case "chzzk":
      console.log(
        `%c Chzzk ` + `%c ${msg}`,
        providerStyles.chzzk,
        logStyles[status || "info"],
      );
      break;
    case "soop":
      console.log(
        `%c Soop ` + `%c ${msg}`,
        providerStyles.soop,
        logStyles[status || "info"],
      );
      break;
    case "youtube":
      console.log(
        `%c Youtube ` + `%c ${msg}`,
        providerStyles.youtube,
        logStyles[status || "info"],
      );
      break;
  }
}

export { chatLogger };
