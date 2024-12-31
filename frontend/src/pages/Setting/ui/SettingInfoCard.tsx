import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import { Alert, textStyles } from "@/shared/ui";

function SettingInfoCard() {
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  return (
    <StyledSettingInfoCard>
      {showAlert ? (
        <Alert
          body={t("pages.setting.what is renju")}
          onClick={() => {
            setShowAlert(false);
          }}
        />
      ) : null}
      <h2
        css={{
          marginBlock: 12,
          ...textStyles.title3,
        }}
      >
        {t("pages.setting.description title")}
      </h2>
      <div css={{ fontSize: 14, fontWeight: "bold" }}>
        <p>{t("pages.setting.description1")}</p>
        <p css={{ fontSize: 12, marginBlock: 2, marginLeft: 14 }}>
          {t("pages.setting.description1-1")}
        </p>
        <p css={{ marginBlock: 10 }}>{t("pages.setting.description2")}</p>
        <p css={{ marginBlock: 10 }}>{t("pages.setting.description3")}</p>
        <p css={{ marginBlock: 10 }}>{t("pages.setting.description4")}</p>
        <p
          css={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {t("pages.setting.description5")}
          <BsQuestionCircleFill
            css={{
              cursor: "pointer",
              marginLeft: 4,
              transition: `all, 0.3s`,
              ":hover": { transform: `scale(1.1)` },
            }}
            onClick={() => {
              setShowAlert(true);
            }}
          />
        </p>
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
