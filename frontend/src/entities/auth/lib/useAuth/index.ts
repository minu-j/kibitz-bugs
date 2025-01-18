import { useNavigate } from "react-router-dom";
import { userStore } from "../..";

import { postAuthCode, postAuthRefresh } from "../..";
import { PostAuthCodeResponse } from "../../api";

export default function () {
  const navigate = useNavigate();

  const { setTwitchUser, setSoopUser, setChzzkUser } = userStore();

  const handleLoginError = () => {
    alert("인증 오류가 발생했습니다. 다시 시도해주세요.");
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

  return { requestToken };
}
