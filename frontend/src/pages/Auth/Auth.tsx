import { postAuthCode } from "@/api/auth";
import { getChannelFollowers, getUsers } from "@/api/helix";
import { postLogin } from "@/api/login";
import { getAccessToken } from "@/api/oauth";
import { IAuthorizationBody } from "@/api/oauth/type";
import { LoadingSpinner } from "@/components";
import { userState } from "@/recoil/user/atoms";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const setUser = useSetRecoilState(userState);

  const handleLoginError = () => {
    alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    navigate("/");
  };

  useEffect(() => {
    const code = queryParams.get("code");
    if (code) {
      postAuthCode(code)
        .then((res) => {
          const token = res.headers["access-token"];
          if (token) {
            setUser({
              id: res.data.streamerId,
              name: res.data.name,
              nickname: res.data.nickname,
              imgUrl: res.data.imgUrl,
              accessToken: token,
            });
            navigate("/setting");
          } else {
            handleLoginError();
          }
        })
        .catch(() => handleLoginError());
    } else {
      handleLoginError();
    }
  }, []);

  return <LoadingSpinner />;
}

export default Auth;
