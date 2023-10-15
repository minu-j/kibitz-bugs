import { textStyles } from "@/styles";
import i18n from "i18next";
import { ChangeEvent, useState } from "react";
import { BsGlobeAsiaAustralia } from "react-icons/bs";

function SelectLocales() {
  const [language, SetLanguage] = useState(i18n.language);
  console.log(i18n.languages);
  const handleChangeSelect = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    i18n.changeLanguage(target.value);
    SetLanguage(i18n.language);
  };
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        transition: `all, 0.3s`,
        ":hover": { transform: `scale(1.1)` },
        ...textStyles.contents,
      }}
    >
      <BsGlobeAsiaAustralia
        css={{
          width: 20,
          height: 20,
        }}
      />
      <select
        css={{
          cursor: "pointer",
          border: "none",
          outline: "none",
          background: "none",
          ...textStyles.contents,
          textAlign: "center",
        }}
        onChange={handleChangeSelect}
        value={language}
        name="languages"
        id="lang"
      >
        <option value="ko">{"한국어"}</option>
        <option value="en">{"English"}</option>
        <option value="cn">{"中文"}</option>
        <option value="jp">{"日本語"}</option>
        <option value="de">{"Deutsch"}</option>
        <option value="fr">{"Français"}</option>
        <option value="ru">{"Русский"}</option>
      </select>
    </div>
  );
}

export default SelectLocales;
