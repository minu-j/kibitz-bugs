import { useState } from "react";
import { colorStyles } from "@styles";
import target from "@assets/images/target.svg";
import blackStone from "@assets/images/blackStone.svg";
import whiteStone from "@assets/images/whiteStone.svg";
import recentMark from "@assets/images/recentMark.svg";
import forbiddenMark from "@assets/images/forbiddenMark.svg";
import { useRecoilValue } from "recoil";
import { gomokuTurnState } from "@/recoil/gomoku/atoms";

interface IGomokuBoardSquareProps {
  size: number;
  stone: number;
  i: number;
  j: number;
  forbidden: boolean;
  recent: boolean;
  moveStone: (i: number, j: number, stone: 1 | 2) => void;
}

function GomokuBoardSquare({
  size,
  stone,
  i,
  j,
  forbidden,
  recent,
  moveStone,
}: IGomokuBoardSquareProps) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const turn = useRecoilValue(gomokuTurnState);

  return (
    <div
      onClick={() => {
        if (stone === 0 && !(turn === 1 && forbidden)) {
          moveStone(i, j, turn);
        }
      }}
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
        cursor: `${stone === 0 && !(turn === 1 && forbidden) ? "pointer" : ""}`,
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
      />
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
      />
      {turn == 1 && forbidden ? (
        <img
          src={forbiddenMark}
          css={{
            width: size,
            height: size,
            transform: "scale(0.8)",
            position: "absolute",
          }}
        />
      ) : stone === 1 ? (
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
            position: "absolute",
            animation: `breath 1s alternate ease-in-out infinite`,
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
