import { IconType } from "react-icons";
import { colorStyles, textStyles } from "../../../styles";
import React from "react";

interface ISettingRowProps {
  left: JSX.Element | JSX.Element[];
  icon: IconType;
  label: string;
  right: JSX.Element | JSX.Element[];
  onClick?(e: React.MouseEvent): void;
}

function SettingRow({ left, icon, label, right, onClick }: ISettingRowProps) {
  const Icon = icon;
  return (
    <div
      css={{
        border: "3px solid",
        borderColor: colorStyles.primary,
        borderRadius: 8,
        backgroundColor: "white",
        width: "500px",
        height: "112px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBlock: "4px",
      }}
    >
      {left}
      <div
        onClick={onClick ? onClick : () => {}}
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          ":hover": { cursor: onClick ? "pointer" : "normal" },
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
