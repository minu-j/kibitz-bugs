import { logo } from "@/shared/resource/images";
import { textStyles } from "@/shared/ui";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  return (
    <header
      css={{
        marginBlock: 48,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        css={{
          animation: `breath 2s alternate ease-in-out infinite`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 200,
          marginBottom: 24,
        }}
      >
        <img
          css={{
            width: "100%",
          }}
          src={logo}
          alt={`logo image`}
        />
        <h1 css={textStyles.title2}>{"키비츠 벅스"}</h1>
      </div>
      <h2 css={textStyles.title3}>{t("pages.login.top description")}</h2>
    </header>
  );
}

export default Header;
