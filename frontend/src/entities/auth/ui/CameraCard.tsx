import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { userStore } from "@/entities/auth";
import { Card, textStyles } from "@/shared/ui";

function CameraCard({ played }: { played?: boolean }) {
  const { t } = useTranslation();
  const { getUser } = userStore();
  return (
    <StyledCameraCard>
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
            css={{
              width: 80,
              borderRadius: "100%",
              filter: played ? "" : "opacity(0.2)",
            }}
            src={getUser()?.imgUrl ?? ""}
          />
          {played ? null : (
            <h4
              css={{
                animation: `floadingUpDown 1s alternate ease-in-out infinite`,
                ...textStyles.contents,
                fontSize: 16,
                position: "absolute",
              }}
            >
              {t("components.camera card.camera is here")}
            </h4>
          )}
        </div>
        <div
          css={{
            position: "absolute",
            right: 10,
            bottom: 10,
          }}
        ></div>
      </Card>
    </StyledCameraCard>
  );
}

export default CameraCard;

const StyledCameraCard = styled.section`
  padding: 8px;
`;
