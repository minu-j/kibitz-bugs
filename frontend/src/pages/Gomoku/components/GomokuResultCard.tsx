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
      <iframe
        css={{
          zIndex: -5,
          position: "absolute",
          height: 300,
          bottom: -70,
        }}
        src="https://embed.lottiefiles.com/animation/32585"
      ></iframe>
      <img css={{ width: 160 }} src={logo} />
      <h2
        css={{
          marginBlock: 24,
          ...textStyles.title2,
          animation: `popIn 0.3s 0s both`,
        }}
      >
        승리
      </h2>
      <h3 css={{ ...textStyles.title1, animation: `popIn 1s 0.3s both` }}>
        {result === 1 ? `${user.name}` : "시청자"}
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
