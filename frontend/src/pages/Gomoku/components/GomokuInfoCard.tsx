import styled from "@emotion/styled";
import logo from "@assets/images/Logo.png";
import vs from "@assets/images/vs.svg";
import whiteStone from "@assets/images/whiteStone.svg";
import blackStone from "@assets/images/blackStone.svg";
import { textStyles } from "@/styles";
import { GomokuProgressBar } from ".";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/user/atoms";
import { gomokuState } from "@/recoil/gomoku/atoms";

function GomokuInfoCard() {
  const user = useRecoilValue(userState);
  const setting = useRecoilValue(gomokuState);

  return (
    <StyledGomokuInfoCard>
      <img css={{ width: 160 }} src={logo} />
      <div css={{ display: "flex", width: "100%", marginBlock: 20 }}>
        {UserInfo(user.name ?? "스트리머", "black")}
        <img css={{ width: 60 }} src={vs} />
        {UserInfo("시청자", "white")}
      </div>
      <GomokuProgressBar progress={60} />
      <h2
        css={{
          marginTop: 10,
          ...textStyles.contents,
        }}
      >
        {`스트리머가 선택 중...`}
      </h2>
    </StyledGomokuInfoCard>
  );

  function UserInfo(label: string, color: "black" | "white") {
    return (
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {color === "black" ? (
          <img
            css={{ width: 40 }}
            src={setting.streamerColor === 1 ? blackStone : whiteStone}
          />
        ) : (
          <img
            css={{ width: 40 }}
            src={setting.viewerColor === 1 ? blackStone : whiteStone}
          />
        )}
        <h2
          css={{
            width: 180,
            textAlign: "center",
            textOverflow: "ellipsis",
            overflow: "hidden",
            marginTop: 10,
            ...textStyles.title2,
          }}
        >
          {label}
        </h2>
      </div>
    );
  }
}

export default GomokuInfoCard;

const StyledGomokuInfoCard = styled.section`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
