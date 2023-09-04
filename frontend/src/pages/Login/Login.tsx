import Logo from "@assets/images/Logo.png";
import styled from "@emotion/styled";
import { LargeBtn } from "@components";
import { textStyles } from "@styles";
import { objectToQueryString } from "@/utils/objectToQueryString";
import Description from "./components/Description";

function Login() {
  const AUTH_URL = import.meta.env.VITE_TWITCH_AUTH_URL;
  const client_id = import.meta.env.VITE_TWITCH_CLIENT_ID;

  const response_type = "code";
  const scope = "openid user:read:email chat:read";
  const redirect_uri = "http://localhost:5173/auth";
  const queryParams = {
    response_type: response_type,
    client_id: client_id,
    redirect_uri: redirect_uri,
    scope: scope,
  };

  return (
    <StyledLogin>
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
      <p
        css={{
          animation: `floadingUpDown 1s alternate ease-in-out infinite`,
          ...textStyles.contents,
        }}
      >
        클릭 한번으로 로그인 하기
      </p>
      <LargeBtn
        label="twitch 로그인"
        onClick={() =>
          location.replace(
            `${AUTH_URL}authorize?${objectToQueryString(queryParams)}`,
          )
        }
      />
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
