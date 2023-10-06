import { objectToQueryString } from "@/utils/objectToQueryString";

const useTwitchLogin = () => {
  const twitchLogin = () => {
    const AUTH_URL = import.meta.env.VITE_TWITCH_AUTH_URL;
    const client_id = import.meta.env.VITE_TWITCH_CLIENT_ID;
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    const response_type = "code";
    const scope =
      "openid user:read:email chat:read chat:edit moderator:manage:shoutouts";
    const redirect_uri = `${BASE_URL}auth`;
    const queryParams = {
      response_type: response_type,
      client_id: client_id,
      redirect_uri: redirect_uri,
      scope: scope,
    };
    location.replace(
      `${AUTH_URL}authorize?${objectToQueryString(queryParams)}`,
    );
  };
  return twitchLogin;
};
export default useTwitchLogin;
