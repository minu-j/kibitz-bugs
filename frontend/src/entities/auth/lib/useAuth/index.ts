import { useNavigate } from "react-router-dom";
import { userStore } from "../..";

import { postAuthCode, postAuthRefresh } from "../..";
import { PostAuthCodeResponse, postAuthLogout } from "../../api";

export default function () {
  const navigate = useNavigate();

  const { setTwitchUser, setSoopUser, setChzzkUser } = userStore();

  const handleLoginError = () => {
    alert("로그인이 필요합니다.");
    navigate("/");
  };

  const handleLoginSuccess = () => {
    navigate("/setting");
  };

  const requestToken = async ({
    provider,
    code,
    state,
  }: {
    provider: string | undefined;
    code: string | null;
    state: string | null;
  }) => {
    if (code && provider) {
      const body = { code, provider, state: state ?? undefined };
      try {
        const res = await postAuthCode(body);
        setLoginUser(res.data);
      } catch (error) {
        handleLoginError();
      }
    } else {
      try {
        const res = await postAuthRefresh();
        setLoginUser(res.data);
      } catch (error) {
        handleLoginError();
      }
    }
  };

  const setLoginUser = ({ soop, twitch, chzzk }: PostAuthCodeResponse) => {
    if (!soop && !twitch && !chzzk) {
      handleLoginError();
    } else {
      if (soop) {
        setSoopUser(soop);
      }
      if (twitch) {
        setTwitchUser(twitch);
      }
      if (chzzk) {
        setChzzkUser(chzzk);
      }
      handleLoginSuccess();
    }
  };

  const logoutProvider = async (provider: string) => {
    const recentProvider = localStorage.getItem("recent_provider");
    try {
      await postAuthLogout({ provider });
      if (recentProvider === provider) {
        window.alert("로그아웃 되었습니다.");
        navigate("/");
      }
      window.location.reload();
    } catch (error) {
      handleLoginError();
    }
  };

  return { requestToken, logoutProvider };
}
