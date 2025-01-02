import styled from "@emotion/styled";
import { useState } from "react";

import largeButtonSrc from "./largeButton.svg";
import clickedLargeButtonSrc from "./clickedLargeButton.svg";
import { textStyles } from "@/shared/ui";
import { click, hover } from "@/shared/resource/audios";

interface ILargeBtnProps {
  label?: string;
  buttonImgSrc?: string;
  clickedButtonImgSrc?: string;
  onClick(e: React.MouseEvent): void;
}

const clickSound = new Audio(click);
const hoverSound = new Audio(hover);

function LargeBtn(props: ILargeBtnProps) {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  return (
    <StyledLargeBtn
      onMouseEnter={() => hoverSound.play()}
      onMouseLeave={() => {
        hoverSound.pause();
        hoverSound.currentTime = 0;
      }}
      onClick={(e) => {
        props.onClick(e);
        clickSound.play();
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      css={{
        width: "160px",
        height: "80px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        css={{
          width: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        src={
          isPressed
            ? props.clickedButtonImgSrc ?? clickedLargeButtonSrc
            : props.buttonImgSrc ?? largeButtonSrc
        }
        alt={`${props.label} button`}
      />
      <p
        css={{
          transform: "translate(-1px, -1px)",
          ...textStyles.button,
        }}
      >
        {props.label}
      </p>
    </StyledLargeBtn>
  );
}

export default LargeBtn;

const StyledLargeBtn = styled.div`
  cursor: pointer;
  width: 248px;
  position: relative;
  transition: transform 0.3s;

  &:hover {
    filter: brightness(0.9);
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }
`;
