import styled from "@emotion/styled";
import cargoonBox from "@assets/images/cartoonBox.svg";
import { textStyles } from "@/styles";

function Description() {
  return (
    <StyledDescription>
      <div
        css={{
          width: 320,
          height: 249,
          marginInline: 2,
          padding: 40,
          backgroundImage: `url(${cargoonBox})`,
          backgroundSize: "cover",
          transform: `rotate(-0.005turn)`,
          transition: `all 0.3s`,
          ":hover": { zIndex: 1, transform: `rotate(-0.01turn) scale(1.03)` },
        }}
      >
        <h2
          css={{ ...textStyles.title2 }}
        >{`스트리머와 시청자의 두뇌싸움!`}</h2>
      </div>
      <div
        css={{
          width: 320,
          height: 249,
          marginInline: 2,
          padding: 40,
          backgroundImage: `url(${cargoonBox})`,
          backgroundSize: "cover",
          transform: `rotate(0.002turn)`,
          transition: `all 0.3s`,
          ":hover": { zIndex: 1, transform: `rotate(0.007turn) scale(1.03)` },
        }}
      >
        <h2 css={{ ...textStyles.title2 }}>
          {`댓글 투표로 시청자의 선택이 결정됩니다`}
        </h2>
      </div>
      <div
        css={{
          width: 320,
          height: 249,
          marginInline: 2,
          padding: 40,
          backgroundImage: `url(${cargoonBox})`,
          backgroundSize: "cover",
          transform: `rotate(0.007turn)`,
          transition: `all 0.3s`,
          ":hover": { zIndex: 1, transform: `rotate(0.013turn) scale(1.03)` },
        }}
      >
        <h2
          css={{ ...textStyles.title2 }}
        >{`집단지성으로 보드게임을 즐겨보세요`}</h2>
      </div>
    </StyledDescription>
  );
}

export default Description;

const StyledDescription = styled.main`
  display: flex;
  margin-block: 50px;
`;
