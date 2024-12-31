import styled from "@emotion/styled";
import progressBar from "./progressBar.svg";

function GomokuProgressBar({ progress }: { progress: number }) {
  return (
    <StyledGomokuProgressBar>
      <img
        css={{
          width: 380,
        }}
        src={progressBar}
      />
      <div
        css={{
          width: (progress / 100) * 366,
          height: 9,
          backgroundColor: "white",
          position: "absolute",
          transition: "all 0.6s",
          top: 4,
          right: 8,
        }}
      />
    </StyledGomokuProgressBar>
  );
}

export default GomokuProgressBar;

const StyledGomokuProgressBar = styled.div`
  position: relative;
`;
