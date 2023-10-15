import { textStyles } from "@/styles";
import i18n from "i18next";
import { ChangeEvent, useState } from "react";

function SelectLocales() {
  const [language, SetLanguage] = useState(i18n.language);
  const handleChangeSelect = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    i18n.changeLanguage(target.value);
    SetLanguage(i18n.language);
  };
  return (
    <select
      css={{
        cursor: "pointer",
        transition: `all, 0.3s`,
        border: "none",
        outline: "none",
        background: "none",
        ":hover": { transform: `scale(1.1)` },
        ...textStyles.contents,
      }}
      onChange={handleChangeSelect}
      value={language}
      name="languages"
      id="lang"
    >
      <option value="ko">{"한국어"}</option>
      <option value="en">{"English"}</option>
    </select>
  );
}

export default SelectLocales;
