import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { chatQueueState } from "@/features/chat";
import { ChatCard } from "@/shared/ui";
import { useChat } from "@/features/chat/lib";

function SettingChatCard() {
  const chatQueue = useRecoilValue(chatQueueState);
  useChat();

  return (
    <StyledSettingChatCard>
      <ChatCard chatQueue={chatQueue} />
    </StyledSettingChatCard>
  );
}

export default SettingChatCard;

const StyledSettingChatCard = styled.section`
  padding: 8px;
`;
