import { isMobile } from "react-device-detect";
import { LargeBtn } from "@components";
import { textStyles } from "@styles";
import { useTranslation } from "react-i18next";
import useTwitchLogin from "@/hooks/useTwitchLogin";

function LoginBtn() {
  const { t } = useTranslation();
  const twitchLogin = useTwitchLogin();

  return isMobile ? (
    <p
      css={{
        animation: `floadingUpDown 1s alternate ease-in-out infinite`,
        ...textStyles.contents,
      }}
    >
      {t("pages.login.play on pc")}
    </p>
  ) : (
    <>
      <p
        css={{
          animation: `floadingUpDown 1s alternate ease-in-out infinite`,
          ...textStyles.contents,
        }}
      >
        {t("pages.login.click for login")}
      </p>
      <LargeBtn label={t("pages.login.login")} onClick={() => twitchLogin()} />
    </>
  );
}

export default LoginBtn;
