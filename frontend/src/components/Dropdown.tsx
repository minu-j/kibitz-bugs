import { textStyles } from "@/styles";
import click from "@assets/audios/click.mp3";
import hover from "@assets/audios/hover.mp3";
import { useTranslation } from "react-i18next";

interface IDropdownProps {
  selectedValue: number;
  values: number[];
  handleSelectChange(value: number): void;
}
const clickSound = new Audio(click);
const hoverSound = new Audio(hover);

function Dropdown({
  selectedValue,
  values,
  handleSelectChange,
}: IDropdownProps) {
  const { t } = useTranslation();
  return (
    <select
      onMouseEnter={() => hoverSound.play()}
      onMouseLeave={() => {
        hoverSound.pause();
        hoverSound.currentTime = 0;
      }}
      onClick={() => clickSound.play()}
      css={{
        cursor: "pointer",
        transition: `all, 0.3s`,
        border: "none",
        outline: "none",
        background: "none",
        ":hover": { transform: `scale(1.1)` },
        ...textStyles.contents,
      }}
      value={selectedValue}
      onChange={(e) => handleSelectChange(parseInt(e.target.value))}
    >
      {values.map((item, idx) => (
        <option key={`option-key-${idx}`} value={item}>
          {item === -1 ? t("components.dropdown.unlimited") : item + t("sec")}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
