import styled from "@emotion/styled";
import { useState } from "react";

import largeButtonSrc from "../assets/images/largeButton.svg";
import clickedLargeButtonSrc from "../assets/images/clickedLargeButton.svg";
import { textStyles } from "../styles";

interface ILargeBtnProps {
  label: string;
  onClick(e: React.MouseEvent): void;
}

function LargeBtn(props: ILargeBtnProps) {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  return (
    <StyledLargeBtn
      onClick={props.onClick}
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
        src={isPressed ? clickedLargeButtonSrc : largeButtonSrc}
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
`;
