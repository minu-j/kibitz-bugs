import { isMobile } from "react-device-detect";
import { textStyles } from "@/styles";
import { useTranslation } from "react-i18next";
import {LargeBtn} from "@/components/button";
import {useTwitchLogin} from "@/features/login/hooks";

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
      {t("pages.login.login")}
    </p>
  ) : (
    <>
      <p
        css={{
          animation: `floadingUpDown 1s alternate ease-in-out infinite`,
          ...textStyles.contents,
        }}
      >
        {t("pages.login.login")}
      </p>
      <LargeBtn label={t("pages.login.login")} onClick={() => twitchLogin()} />
    </>
  );
}

export default LoginBtn;
