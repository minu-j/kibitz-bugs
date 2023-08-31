import { gomokuResultState } from "@/recoil/gomoku/atoms";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import logo from "@assets/images/Logo.png";
import { userState } from "@/recoil/user/atoms";
import { textStyles } from "@/styles";

function GomokuResultCard() {
  const result = useRecoilValue(gomokuResultState);
  const user = useRecoilValue(userState);

  return (
    <StyledGomokuResultCard>
      <img css={{ width: 160 }} src={logo} />
      <h2 css={{ marginBlock: 24, ...textStyles.title2 }}>게임 종료</h2>
      <h3 css={{ ...textStyles.title1 }}>
        {result === 1 ? `${user.name} 승` : "시청자 승"}
      </h3>
    </StyledGomokuResultCard>
  );
}

export default GomokuResultCard;

const StyledGomokuResultCard = styled.section`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
