import styled from "@emotion/styled";
import { textStyles } from "@/styles";

function SettingInfoCard() {
  return (
    <StyledSettingInfoCard>
      <h2
        css={{
          marginBlock: 16,
          ...textStyles.title2,
        }}
      >
        {`게임 설명`}
      </h2>
      <div css={{ fontSize: 14, fontWeight: "bold" }}>
        <p>{`1. 채팅으로 원하는 좌표를 입력합니다.`}</p>
        <p
          css={{ fontSize: 12, marginBlock: 8, marginLeft: 14 }}
        >{`(A1, a10, A10, 8B, 14g 등 위치를 특정할 수 있는 좌표 형식)`}</p>
        <p css={{ marginBlock: 12 }}>
          {`2. 가장 많은 표를 획득한 좌표가 시청자의 수가 됩니다.`}
        </p>
        <p css={{ marginBlock: 12 }}>
          {`3. 시간 내에 투표하지 않으면 패합니다.`}
        </p>
        <p css={{ marginBlock: 12 }}>{`4. 중복투표는 불가합니다.`}</p>
        <p>{`5. 규칙은 렌주룰을 적용합니다.`}</p>
      </div>
    </StyledSettingInfoCard>
  );
}

export default SettingInfoCard;

const StyledSettingInfoCard = styled.section`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
