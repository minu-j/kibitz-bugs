import styled from "@emotion/styled";
import { textStyles } from "@/shared/ui";
import { click, hover } from "@/shared/resource/audios";

interface ISmallBtnProps {
  label: string;
  onClick(e: React.MouseEvent): void;
}

const clickSound = new Audio(click);
const hoverSound = new Audio(hover);

function SmallBtn({ label, onClick }: ISmallBtnProps) {
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
        width: "100%",
        backgroundColor: "white",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        textAlign: "center",
      }}
    >
      <p
        css={{
          ...textStyles.contents,
        }}
      >
        {label}
      </p>
    </StyledSmallBtn>
  );
}

export default SmallBtn;

const StyledSmallBtn = styled.div`
  cursor: pointer;
  border: black 3px solid;
  border-radius: 8px;
  transition: all 0.1s;
  padding: 8px;
  &:hover {
    filter: brightness(0.95);
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;
