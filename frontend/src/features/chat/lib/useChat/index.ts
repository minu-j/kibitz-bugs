import useChatChzzk from "../useChatChzzk";
import useChatSoop from "../useChatSoop";
import useChatTwitch from "../useChatTwitch";
import { TAddVote } from "../useChatVote";

function useChat(addVote?: TAddVote) {
  useChatTwitch(addVote);
  useChatChzzk(addVote);
  useChatSoop(addVote);
}

export default useChat;
