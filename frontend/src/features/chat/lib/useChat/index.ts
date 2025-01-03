import { userState } from "@/entities/auth";

import { useEffect, useMemo } from "react";
import useChatChzzk from "../useChatChzzk";
import useChatSoop from "../useChatSoop";
import useChatTwitch from "../useChatTwitch";
import { TAddVote } from "../useChatVote";
import { useRecoilValue } from "recoil";
import useChatYoutube from "../useChatYoutube";

function useChat(addVote: TAddVote) {
  const user = useRecoilValue(userState);
  const isTwitchLoggedIn = useMemo(() => true, []);
  const isChzzkLoggedIn = useMemo(() => true, []);
  const isSoopLoggedIn = useMemo(() => true, []);
  const isYoutubeLoggedIn = useMemo(() => true, []);

  const { init: initTwitch, cleanup: cleanupTwitch } = useChatTwitch(addVote);
  const { init: initChzzk, cleanup: cleanupChzzk } = useChatChzzk(addVote);
  const { init: initSoop, cleanup: cleanupSoop } = useChatSoop(addVote);
  const { init: initYoutube, cleanup: cleanupYoutube } =
    useChatYoutube(addVote);

  const init = () => {
    if (isTwitchLoggedIn) initTwitch();
    if (isChzzkLoggedIn) initChzzk();
    if (isSoopLoggedIn) initSoop();
    if (isYoutubeLoggedIn) initYoutube();
  };

  const cleanup = () => {
    if (isTwitchLoggedIn) cleanupTwitch();
    if (isChzzkLoggedIn) cleanupChzzk();
    if (isSoopLoggedIn) cleanupSoop();
    if (isYoutubeLoggedIn) cleanupYoutube();
  };

  useEffect(() => {
    init();
    return cleanup;
  }, [
    isTwitchLoggedIn,
    isChzzkLoggedIn,
    isSoopLoggedIn,
    isYoutubeLoggedIn,
    user,
  ]);
}

export default useChat;
