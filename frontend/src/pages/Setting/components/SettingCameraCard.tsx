import styled from "@emotion/styled";
import { Card } from "@components";
import { textStyles } from "@/styles";
import { userState } from "@/recoil/user/atoms";
import { useRecoilValue } from "recoil";

function SettingCameraCard() {
  const user = useRecoilValue(userState);
  return (
    <StyledSettingCameraCard>
      <Card>
        <div
          css={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            alignItems: "center",
          }}
        >
          <img
            css={{ width: 80, borderRadius: "100%", filter: "opacity(0.2)" }}
            src={user.imgUrl}
          />
          <h4
            css={{
              animation: `floadingUpDown 1s alternate ease-in-out infinite`,
              ...textStyles.contents,
              fontSize: 16,
              position: "absolute",
            }}
          >{`카메라를 여기에 놓아주세요`}</h4>
        </div>
        <div
          css={{
            position: "absolute",
            right: 10,
            bottom: 10,
          }}
        ></div>
      </Card>
    </StyledSettingCameraCard>
  );
}

export default SettingCameraCard;

const StyledSettingCameraCard = styled.section`
  padding: 8px;
`;
