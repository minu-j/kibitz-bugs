import styled from "@emotion/styled";
import { IconType } from "react-icons";

import smallButton from "../assets/images/smallButton.svg";
import click from "@assets/audios/click.mp3";
import hover from "@assets/audios/hover.mp3";

interface ISmallBtnProps {
  icon: IconType;
  onClick(e: React.MouseEvent): void;
}

const clickSound = new Audio(click);
const hoverSound = new Audio(hover);

function SmallBtn({ icon, onClick }: ISmallBtnProps) {
  const Icon = icon;
  return (
    <StyledSmallBtn
      onMouseEnter={() => hoverSound.play()}
      onMouseLeave={() => {
        hoverSound.pause();
        hoverSound.currentTime = 0;
      }}
      onClick={(e) => {
        onClick(e);
        clickSound.play();
      }}
      css={{
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${smallButton})`,
        backgroundSize: "cover",
      }}
    >
      <Icon
        css={{
          width: "30px",
          height: "30px",
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
