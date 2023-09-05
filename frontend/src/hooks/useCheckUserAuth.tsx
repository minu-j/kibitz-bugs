import { userState } from "@/recoil/user/atoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

/** 유저 정보의 손실을 감지하고, 새로고침을 방지하는 커스텀 훅 */
function useCheckUserAuth() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  // 새로고침 방지
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 유저 정보 손실 감지
  useEffect(() => {
    if (!user.nickname || !user.accessToken) {
      alert("로그아웃되었습니다. 다시 로그인해주세요.");
      navigate("/");
    }
  }, [user]);
}

export default useCheckUserAuth;
