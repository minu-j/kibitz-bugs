import styled from "@emotion/styled";
import { textStyles } from "../../styles";
import vs from "../../assets/images/vs.svg";
import SettingRow from "./components/SettingRow";
import { TbArrowsDiff, TbAlarm } from "react-icons/tb";
import { LargeBtn } from "../../components";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();

  return (
    <StyledSetting>
      <h1 css={{ ...textStyles.title1 }}>게임설정</h1>
      <div
        css={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBlock: "48px 16px",
        }}
      >
        <h2 css={{ width: "210px", textAlign: "center", ...textStyles.title2 }}>
          스트리머
        </h2>
        <img src={vs} />
        <h2 css={{ width: "210px", textAlign: "center", ...textStyles.title2 }}>
          시청자
        </h2>
      </div>
      <SettingRow
        left={
          <div
            css={{ width: "210px", textAlign: "center", ...textStyles.title2 }}
          >
            스트리머
          </div>
        }
        icon={TbArrowsDiff}
        label="선공"
        right={
          <div
            css={{ width: "210px", textAlign: "center", ...textStyles.title2 }}
          >
            시청자
          </div>
        }
      />
      <SettingRow
        left={
          <div
            css={{ width: "210px", textAlign: "center", ...textStyles.title2 }}
          >
            스트리머
          </div>
        }
        icon={TbAlarm}
        label="제한시간"
        right={
          <div
            css={{ width: "210px", textAlign: "center", ...textStyles.title2 }}
          >
            시청자
          </div>
        }
      />
      <LargeBtn
        label="게임시작!"
        onClick={() => {
          navigate("/gomoku");
        }}
      ></LargeBtn>
    </StyledSetting>
  );
}

export default Setting;

const StyledSetting = styled.main`
  width: 1280px;
  height: 720px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
