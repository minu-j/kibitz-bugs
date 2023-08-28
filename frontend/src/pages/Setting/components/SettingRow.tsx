import { IconType } from "react-icons";
import settingBox from "../../../assets/images/settingBox.svg";
import { textStyles } from "../../../styles";

interface ISettingRowProps {
  left: JSX.Element | JSX.Element[];
  icon: IconType;
  label: string;
  right: JSX.Element | JSX.Element[];
}

function SettingRow({ left, icon, label, right }: ISettingRowProps) {
  const Icon = icon;
  return (
    <div
      css={{
        backgroundImage: `url(${settingBox})`,
        backgroundSize: "cover",
        width: "500px",
        height: "120px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBlock: "8px 8px",
      }}
    >
      {left}
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 60,
        }}
      >
        <Icon size={32} />
        <div
          css={{
            ...textStyles.button,
          }}
        >
          {label}
        </div>
      </div>
      {right}
    </div>
  );
}

export default SettingRow;
