import { textStyles } from "@/styles";

interface IDropdownProps {
  selectedValue: number;
  values: number[];
  handleSelectChange(value: number): void;
}

function Dropdown({
  selectedValue,
  values,
  handleSelectChange,
}: IDropdownProps) {
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
      value={selectedValue}
      onChange={(e) => {
        handleSelectChange(parseInt(e.target.value));
      }}
    >
      {values.map((item, idx) => (
        <option key={`option-key-${idx}`} value={item}>
          {item === -1 ? "무제한" : `${item / 10}초`}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
