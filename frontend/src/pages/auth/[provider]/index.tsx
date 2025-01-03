import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState, postAuthCode, postAuthRefresh } from "@/entities/auth";
import { LoadingSpinner } from "@/shared/ui";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { provider } = useParams();
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

  const postAuth = async () => {
    const code = queryParams.get("code");
    if (code && provider) {
      try {
        const res = await postAuthCode(code, provider);
        userLogin(res);
      } catch (error) {
        handleLoginError();
      }
    } else {
      try {
        const res = await postAuthRefresh();
        userLogin(res);
      } catch (error) {
        handleLoginError();
      }
    }
  };

  useEffect(() => {
    postAuth();
  }, []);

  return <LoadingSpinner />;
}

export default Auth;
