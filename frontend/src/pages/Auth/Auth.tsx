import { getUsers } from "@/api/helix";
import { postLogin } from "@/api/login";
import { getAccessToken } from "@/api/oauth";
import { IAuthorizationBody } from "@/api/oauth/type";
import { LoadingSpinner } from "@/components";
import { userState } from "@/recoil/user/atoms";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

function Auth() {
  const client_id = import.meta.env.VITE_TWITCH_CLIENT_ID;
  const client_secret = import.meta.env.VITE_TWITCH_CLIENT_SECRET;

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const grant_type = "authorization_code";
  const redirect_uri = `http://localhost:5173/auth`;

  const setUser = useSetRecoilState(userState);

  const handleLoginError = () => {
    alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    navigate("/login");
  };

  useEffect(() => {
    if (code != null) {
      const body: IAuthorizationBody = {
        client_id: client_id,
        client_secret: client_secret,
        code: code,
        grant_type: grant_type,
        redirect_uri: redirect_uri,
      };
      // access token 요청
      getAccessToken(body)
        .then((res) => {
          const accessToken = res.data.access_token;
          const refreshToken = res.data.refresh_token;
          // 로그인한 user 정보 요청
          getUsers({
            accessToken: `Bearer ${accessToken}`,
            clientId: client_id,
          })
            .then((res) => {
              const id = res.data.data[0].id;
              const name = res.data.data[0].login;
              const nickname = res.data.data[0].display_name;
              const email = res.data.data[0].email;
              const imgUrl = res.data.data[0].profile_image_url;
              // 유저 정보 recoil 저장
              setUser({
                id: id,
                name: name,
                nickname: nickname,
                email: email,
                imgUrl: imgUrl,
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
              // DB에 로그인 기록 전송
              postLogin({
                id: id,
                name: name,
                nickname: nickname,
                imgUrl: imgUrl,
              });
              //setting 페이지로 이동
              navigate("/setting");
            })
            .catch(() => handleLoginError());
        })
        .catch(() => handleLoginError());
    } else {
      handleLoginError();
    }
  }, []);

  return (
    <main>
      <LoadingSpinner />
    </main>
  );
}

export default Auth;
