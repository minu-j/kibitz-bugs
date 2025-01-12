import { useEffect, useState } from "react";
import useInterval from "use-interval";
import { timer, move } from "@/shared/resource/audios";
import { gomokuState, str2numCoord, useMoveStone } from "@/entities/game";
import { useSetRecoilState } from "recoil";
import { gomokuResultState } from "@/entities/game";
import { useRecoilValue } from "recoil";
import { gomokuTurnState, gomokuVoteState } from "@/entities/game";
import { useRecoilState } from "recoil";
import { gomokuNowPlayerState } from "@/entities/game";

const timerSound = new Audio(timer);
const moveSound = new Audio(move);

function useGameplay() {
  const setting = useRecoilValue(gomokuState);
  const turn = useRecoilValue(gomokuTurnState);
  const [nowPlayer, setNowPlayer] = useRecoilState(gomokuNowPlayerState);
  const [time, setTime] = useState(-1);
  const [vote, setVote] = useRecoilState(gomokuVoteState);
  const setResult = useSetRecoilState(gomokuResultState);
  const moveStone = useMoveStone();

  useInterval(() => {
    if (time === 6 && nowPlayer === 1) {
      timerSound.play();
    } else if (time > 6 && timerSound.played) {
      timerSound.pause();
      timerSound.currentTime = 0;
    }
    if (0 < time) {
      setTime((ot) => ot - 1);
    } else if (time === 0) {
      if (nowPlayer === 1) {
        setResult(2);
      } else {
        if (vote.total) {
          let maxKey = "";
          let maxValue = -1;

          for (const [key, value] of vote.count) {
            if (value > maxValue) {
              maxKey = key;
              maxValue = value;
            }
          }
          const [i, j] = str2numCoord(maxKey);
          moveStone(i, j, setting.viewerColor);
        } else {
          setResult(1);
        }
      }
    }
  }, 1000);

  useEffect(() => {
    if (setting.streamerColor === turn) {
      setTime(setting.streamerTime);
      setNowPlayer(1);
    } else {
      setTime(setting.viewerTime);
      setNowPlayer(2);
    }
    moveSound.play();
    setVote({ count: new Map(), total: 0 });

    return () => {
      timerSound.pause();
      timerSound.currentTime = 0;
    };
  }, [turn]);

  return {
    time,
  };
}

export default useGameplay;
