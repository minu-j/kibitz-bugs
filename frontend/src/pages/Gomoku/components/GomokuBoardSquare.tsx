import { useState } from "react";
import { colorStyles, textStyles } from "@styles";
import target from "@assets/images/target.svg";
import blackStone from "@assets/images/blackStone.svg";
import whiteStone from "@assets/images/whiteStone.svg";
import recentMark from "@assets/images/recentMark.svg";
import forbiddenMark from "@assets/images/forbiddenMark.svg";
import { useRecoilValue } from "recoil";
import {
  gomokuNowPlayerState,
  gomokuTurnState,
  gomokuVoteState,
} from "@/recoil/gomoku/atoms";
import { num2strCoord } from "@/utils/num2strCoord";
import useMoveStone from "@/hooks/useMoveStone";

interface IGomokuBoardSquareProps {
  size: number;
  stone: number;
  i: number;
  j: number;
  forbidden: boolean;
  recent: boolean;
}

function GomokuBoardSquare({
  size,
  stone,
  i,
  j,
  forbidden,
  recent,
}: IGomokuBoardSquareProps) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const turn = useRecoilValue(gomokuTurnState);
  const nowPlayer = useRecoilValue(gomokuNowPlayerState);
  const vote = useRecoilValue(gomokuVoteState);

  const moveStone = useMoveStone();

  return (
    <div
      onClick={() => {
        if (stone === 0 && !(turn === 1 && forbidden) && nowPlayer === 1) {
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
        cursor: `${
          stone === 0 && !(turn === 1 && forbidden) && nowPlayer === 1
            ? "pointer"
            : ""
        }`,
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

      {vote.count.has(num2strCoord(i, j)) ? (
        <div
          css={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50% , -50%)",
            ...textStyles.title2,
          }}
        >
          {((vote.count.get(num2strCoord(i, j))! / vote.total) * 100).toFixed(
            0,
          )}
          <span
            css={{
              ...textStyles.contents,
            }}
          >
            %
          </span>
        </div>
      ) : null}

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
      ) : mouseOver && nowPlayer === 1 ? (
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
