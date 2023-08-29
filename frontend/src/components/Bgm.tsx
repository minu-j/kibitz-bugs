import bgm from "@assets/audios/BGM.mp3";

function Bgm() {
  const audio = new Audio(bgm);
  return (
    <button
      onClick={() => {
        audio.play();
      }}
    >
      재생
    </button>
  );
}

export default Bgm;
