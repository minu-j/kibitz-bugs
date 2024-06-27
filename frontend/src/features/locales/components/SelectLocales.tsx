import { textStyles } from "@/styles";
import i18n from "i18next";
import { ChangeEvent, useState } from "react";
import { BsGlobeAsiaAustralia } from "react-icons/bs";

const localeOptions =[
    {label: '한국어', value: 'ko'},
    {label: 'English', value: 'en'},
    {label: '中文', value: 'cn'},
    {label: '日本語', value: 'jp'},
    {label: 'Deutsch', value: 'de'},
    {label: 'Français', value: 'fr'},
    {label: 'Русский', value: 'ru'},
]

function SelectLocales() {
  const [language, SetLanguage] = useState(i18n.language);

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
        {localeOptions.map(({label, value}) => <option key={`locale-option-${value}`} value={value}>{label}</option>)}
      </select>
    </div>
  );
}

export default SelectLocales;
