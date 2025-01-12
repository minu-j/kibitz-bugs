import { objectToQueryString } from "@/shared/lib";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export default function () {
  const twitchLogin = () => {
    const AUTH_URL = import.meta.env.VITE_TWITCH_AUTH_URL;
    const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;

    const scopes = [
      "openid",
      "user:read:email",
      "chat:read",
      "chat:edit",
      "moderator:manage:shoutouts",
    ];

    const queryParams = {
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: BASE_URL + "auth/twitch",
      scope: scopes.join(" "),
    };
    location.replace(`${AUTH_URL}?${objectToQueryString(queryParams)}`);
  };

  const soopLogin = () => {
    const AUTH_URL = import.meta.env.VITE_SOOP_AUTH_URL;
    const CLIENT_ID = import.meta.env.VITE_SOOP_CLIENT_ID;

    const queryParams = {
      client_id: CLIENT_ID,
    };
    location.replace(`${AUTH_URL}?${objectToQueryString(queryParams)}`);
  };

  const chzzkLogin = () => {
    const AUTH_URL = import.meta.env.VITE_CHZZK_AUTH_URL;
    const CLIENT_ID = import.meta.env.VITE_CHZZK_CLIENT_ID;

    const queryParams = {
      clientId: CLIENT_ID,
      redirectUri: BASE_URL + "auth/chzzk",
      state: "kibitz-bugs",
    };
    location.replace(`${AUTH_URL}?${objectToQueryString(queryParams)}`);
  };

  const youtubeLogin = () => {
    const AUTH_URL = import.meta.env.VITE_YOUTUBE_AUTH_URL;
    const CLIENT_ID = import.meta.env.VITE_YOUTUBE_CLIENT_ID;

    const queryParams = {
      client_id: CLIENT_ID,
      redirect_uri: BASE_URL + "auth/youtube",
      response_type: "code",
      scope: "https://www.googleapis.com/auth/youtube.readonly",
      state: "kibitz-bugs",
    };
    location.replace(`${AUTH_URL}?${objectToQueryString(queryParams)}`);
  };

  return { twitchLogin, soopLogin, chzzkLogin, youtubeLogin };
}
