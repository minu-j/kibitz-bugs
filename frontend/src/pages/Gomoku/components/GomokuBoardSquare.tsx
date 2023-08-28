import { useState } from "react";
import { colorStyles } from "../../../styles";
import target from "../../../assets/images/target.svg";
import blackStone from "../../../assets/images/blackStone.svg";
import whiteStone from "../../../assets/images/whiteStone.svg";
import recentMark from "../../../assets/images/recentMark.svg";

interface IGomokuBoardSquareProps {
  size: number;
  stone: 0 | 1 | 2;
  recent: boolean;
}

function GomokuBoardSquare({ size, stone, recent }: IGomokuBoardSquareProps) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setMouseOver(false);
      }}
      css={{
        width: size,
        height: size,
        flexShrink: 0,
        cursor: `${stone === 0 ? "pointer" : ""}`,
      }}
    >
      <div
        css={{
          width: "100%",
          height: "2px",
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translate(0, -50%)",
          backgroundColor: colorStyles.lightGray,
        }}
      ></div>
      <div
        css={{
          width: "2px",
          height: "100%",
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translate(-50% , 0)",
          backgroundColor: colorStyles.lightGray,
        }}
      ></div>
      {stone === 1 ? (
        <img
          src={blackStone}
          css={{
            width: size,
            height: size,
            transform: "scale(0.8)",
            position: "absolute",
          }}
        />
      ) : stone === 2 ? (
        <img
          src={whiteStone}
          css={{
            width: size,
            height: size,
            transform: "scale(0.8)",
            position: "absolute",
          }}
        />
      ) : mouseOver ? (
        <img
          src={target}
          css={{
            width: size,
            height: size,
            transform: "scale(0.8)",
            position: "absolute",
          }}
        />
      ) : null}
      {recent && stone !== 0 ? (
        <img
          src={recentMark}
          css={{
            width: size,
            height: size,
            transform: "scale(0.3)",
            position: "absolute",
          }}
        />
      ) : null}
    </div>
  );
}

export default GomokuBoardSquare;
