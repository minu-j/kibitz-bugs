import Logo from "@assets/images/Logo.png";
import styled from "@emotion/styled";
import { Footer, LargeBtn } from "@components";
import { textStyles } from "@styles";
import { objectToQueryString } from "@/utils/objectToQueryString";
import Description from "./components/Description";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();

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

  return (
    <StyledLogin>
      {/* <button>언어</button> */}
      <div
        css={{
          animation: `breath 2s alternate ease-in-out infinite`,
        }}
      >
        <img
          css={{
            width: "60%",
          }}
          src={Logo}
        />
        <h1 css={{ ...textStyles.title2 }}>{"키비츠 벅스"}</h1>
      </div>
      <Description />
      {isMobile ? (
        <p
          css={{
            animation: `floadingUpDown 1s alternate ease-in-out infinite`,
            ...textStyles.contents,
          }}
        >
          PC로 접속해 플레이하세요.
        </p>
      ) : (
        <>
          <p
            css={{
              animation: `floadingUpDown 1s alternate ease-in-out infinite`,
              ...textStyles.contents,
            }}
          >
            {t("pages.login.click for login")}
          </p>
          <LargeBtn
            label={t("pages.login.login")}
            onClick={() =>
              location.replace(
                `${AUTH_URL}authorize?${objectToQueryString(queryParams)}`,
              )
            }
          />
        </>
      )}
      <Footer />
    </StyledLogin>
  );
}

export default Login;

const StyledLogin = styled.main`
  width: 1280px;
  height: 720px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
