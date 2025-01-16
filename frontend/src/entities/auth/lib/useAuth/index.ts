import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { userStore } from "../..";

import { postAuthCode, postAuthRefresh } from "../..";
import { AxiosResponse } from "axios";

export default function () {
  const navigate = useNavigate();
  const location = useLocation();
  const { provider } = useParams();
  const queryParams = new URLSearchParams(location.search);

  const { setTwitchUser, setSoopUser, setChzzkUser } = userStore();

  const handleLoginError = () => {
    alert("인증 오류가 발생했습니다. 다시 시도해주세요.");
    navigate("/");
  };
  const userLogin = (res: AxiosResponse) => {
    const token = res.headers["access-token"];
    const user = {
      id: res.data.streamerId,
      name: res.data.name,
      nickname: res.data.nickname,
      imgUrl: res.data.imgUrl,
      accessToken: token,
    };
    if (token) {
      if (provider === "twitch") {
        setTwitchUser(user);
      } else if (provider === "soop") {
        setSoopUser(user);
      } else if (provider === "chzzk") {
        setChzzkUser(user);
      }
      navigate("/setting");
    } else {
      handleLoginError();
    }
  };

  const requestToken = async () => {
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

  return { requestToken };
}
