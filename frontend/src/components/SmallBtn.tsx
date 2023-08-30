import styled from "@emotion/styled";
import { IconType } from "react-icons";

import smallButton from "../assets/images/smallButton.svg";

interface ISmallBtnProps {
  icon: IconType;
  onClick(e: React.MouseEvent): void;
}

function SmallBtn({ icon, onClick }: ISmallBtnProps) {
  const Icon = icon;
  return (
    <StyledSmallBtn
      onClick={onClick}
      css={{
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${smallButton})`,
        backgroundSize: "cover",
      }}
    >
      <Icon
        css={{
          width: "50px",
          height: "50px",
        }}
      />
    </StyledSmallBtn>
  );
}

export default SmallBtn;

const StyledSmallBtn = styled.div`
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    filter: brightness(0.95);
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;
