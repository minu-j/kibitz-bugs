import bgm from "@assets/audios/BGM.mp3";

function Bgm() {
  const audio = new Audio(bgm);
  const playAudio = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return <button onClick={() => playAudio()}>재생</button>;
}

export default Bgm;
