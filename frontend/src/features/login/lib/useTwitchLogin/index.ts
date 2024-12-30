import { objectToQueryString } from "@/shared/lib";

export default function () {
  const twitchLogin = () => {
    const AUTH_URL = import.meta.env.VITE_TWITCH_AUTH_URL;
    const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

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
      redirect_uri: BASE_URL + "auth",
      scope: scopes.join(" "),
    };
    location.replace(
      `${AUTH_URL}authorize?${objectToQueryString(queryParams)}`,
    );
  };
  return twitchLogin;
}
