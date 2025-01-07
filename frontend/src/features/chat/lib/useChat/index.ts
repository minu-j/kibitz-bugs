import { useEffect, useMemo } from "react";
import useChatChzzk from "../useChatChzzk";
import useChatSoop from "../useChatSoop";
import useChatTwitch from "../useChatTwitch";
import { TAddVote } from "../useChatVote";
import { userStore } from "@/entities/auth";

function useChat(addVote: TAddVote) {
  const { user } = userStore();
  const isTwitchLoggedIn = useMemo(() => true, []);
  const isChzzkLoggedIn = useMemo(() => true, []);
  const isSoopLoggedIn = useMemo(() => true, []);

  const { init: initTwitch, cleanup: cleanupTwitch } = useChatTwitch(addVote);
  const { init: initChzzk, cleanup: cleanupChzzk } = useChatChzzk(addVote);
  const { init: initSoop, cleanup: cleanupSoop } = useChatSoop(addVote);

  useEffect(() => {
    if (isTwitchLoggedIn) initTwitch();
    if (isChzzkLoggedIn) initChzzk();
    if (isSoopLoggedIn) initSoop();

    return () => {
      if (isTwitchLoggedIn) cleanupTwitch();
      if (isChzzkLoggedIn) cleanupChzzk();
      if (isSoopLoggedIn) cleanupSoop();
    };
  }, [isTwitchLoggedIn, isChzzkLoggedIn, isSoopLoggedIn, user]);
}

export default useChat;
