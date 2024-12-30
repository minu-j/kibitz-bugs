import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../..";

/** 유저 정보의 손실을 감지하고, 새로고침을 방지하는 커스텀 훅 */
export default function () {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  // 유저 정보 손실 감지
  useEffect(() => {
    if (!user.accessToken) {
      navigate("/auth");
    }
  }, [user]);
}
