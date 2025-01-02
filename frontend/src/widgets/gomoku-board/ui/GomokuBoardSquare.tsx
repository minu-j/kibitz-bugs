import { useState } from "react";
import { useRecoilValue } from "recoil";
import { colorStyles, textStyles } from "@/shared/ui";
import target from "./target.svg";
import { blackStone, whiteStone } from "@/shared/resource/images";
import recentMark from "./recentMark.svg";
import forbiddenMark from "./forbiddenMark.svg";
import {
  useMoveStone,
  gomokuNowPlayerState,
  gomokuRecordState,
  gomokuResultState,
  gomokuTurnState,
  num2strCoord,
} from "@/entities/game";

interface IGomokuBoardSquareProps {
  size: number;
  stone: number;
  i: number;
  j: number;
  forbidden: boolean;
  recent: boolean;
  voteRate: number;
}

function GomokuBoardSquare({
  size,
  stone,
  i,
  j,
  forbidden,
  recent,
  voteRate,
}: IGomokuBoardSquareProps) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const turn = useRecoilValue(gomokuTurnState);
  const nowPlayer = useRecoilValue(gomokuNowPlayerState);
  const result = useRecoilValue(gomokuResultState);
  const record = useRecoilValue(gomokuRecordState);

  const moveStone = useMoveStone();

  return (
    <div
      onClick={() => {
        if (
          stone === 0 &&
          !(turn === 1 && forbidden) &&
          nowPlayer === 1 &&
          !result
        ) {
          moveStone(i, j, turn);
        }
      }}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      css={{
        width: size,
        height: size,
        flexShrink: 0,
        cursor: `${
          stone === 0 &&
          !(turn === 1 && forbidden) &&
          nowPlayer === 1 &&
          !result
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
      {
        // 착수 기록 표시
        result ? (
          <div
            css={{
              fontSize: 14,
              fontWeight: "bold",
              color: stone === 1 ? "white" : "black",
              position: "absolute",
              zIndex: 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -40%)",
            }}
          >
            {record.indexOf(num2strCoord(i, j)) > 0
              ? record.indexOf(num2strCoord(i, j))
              : null}
          </div>
        ) : null
      }
      {
        // 시청자 투표율 표시
        nowPlayer === 2 && voteRate && !result ? (
          <div
            css={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              animation: `popIn 0.3s 0s both`,
              ...textStyles.title2,
              fontSize: 24,
            }}
          >
            {voteRate}
            <span
              css={{
                ...textStyles.contents,
              }}
            >
              %
            </span>
          </div>
        ) : null
      }

      {
        // 착수 금지위치, 백돌, 흑돌, 타겟 이미지 표시
        turn === 1 && forbidden ? (
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
        ) : mouseOver && nowPlayer === 1 && !result ? (
          <img
            src={target}
            css={{
              width: size,
              height: size,
              position: "absolute",
              animation: `breath 1s alternate ease-in-out infinite`,
            }}
          />
        ) : null
      }
      {
        // 최근 착수위치 표시
        recent && stone !== 0 && !result ? (
          <img
            src={recentMark}
            css={{
              width: size,
              height: size,
              transform: "scale(0.3)",
              position: "absolute",
            }}
          />
        ) : null
      }
    </div>
  );
}

export default GomokuBoardSquare;
