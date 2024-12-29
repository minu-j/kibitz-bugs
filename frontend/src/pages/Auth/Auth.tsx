import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { postAuthCode, postAuthRefresh } from "@/features/auth/api";
import { userState } from "@/features/auth/recoil/user/atoms.ts";
import { LoadingSpinner } from "@/shared/ui/loading";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const setUser = useSetRecoilState(userState);

  const handleLoginError = () => {
    alert("인증 오류가 발생했습니다. 다시 시도해주세요.");
    navigate("/");
  };
  const userLogin = (res: AxiosResponse) => {
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
  };

  useEffect(() => {
    const code = queryParams.get("code");
    if (code) {
      postAuthCode(code)
        .then((res) => {
          userLogin(res);
        })
        .catch(() => handleLoginError());
    } else {
      postAuthRefresh()
        .then((res) => {
          userLogin(res);
        })
        .catch(() => handleLoginError());
    }
  }, []);

  return <LoadingSpinner />;
}

export default Auth;
