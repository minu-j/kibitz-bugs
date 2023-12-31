import { userState } from "@/recoil/user/atoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

/** 유저 정보의 손실을 감지하고, 새로고침을 방지하는 커스텀 훅 */
function useCheckUserAuth() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  // 유저 정보 손실 감지
  useEffect(() => {
    if (!user.accessToken) {
      navigate("/auth");
    }
  }, [user]);
}

export default useCheckUserAuth;
