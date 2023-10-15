import styled from "@emotion/styled";
import { textStyles } from "@/styles";
import { useTranslation } from "react-i18next";

function SettingInfoCard() {
  const { t } = useTranslation();
  return (
    <StyledSettingInfoCard>
      <h2
        css={{
          marginBlock: 16,
          ...textStyles.title2,
        }}
      >
        {t("pages.setting.description title")}
      </h2>
      <div css={{ fontSize: 14, fontWeight: "bold" }}>
        <p>{t("pages.setting.description1")}</p>
        <p css={{ fontSize: 12, marginBlock: 8, marginLeft: 14 }}>
          {t("pages.setting.description1-1")}
        </p>
        <p css={{ marginBlock: 12 }}>{t("pages.setting.description2")}</p>
        <p css={{ marginBlock: 12 }}>{t("pages.setting.description3")}</p>
        <p css={{ marginBlock: 12 }}>{t("pages.setting.description4")}</p>
        <p>{t("pages.setting.description5")}</p>
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
