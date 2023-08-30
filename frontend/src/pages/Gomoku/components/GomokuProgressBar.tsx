import styled from "@emotion/styled";
import progressBar from "@assets/images/progressBar.svg";

function GomokuProgressBar({ progress }: { progress: number }) {
  return (
    <StyledGomokuProgressBar>
      <img
        css={{
          width: 400,
        }}
        src={progressBar}
      />
      <div
        css={{
          width: (progress / 100) * 384,
          height: 9,
          backgroundColor: "white",
          position: "absolute",
          top: 4,
          right: 9,
        }}
      />
    </StyledGomokuProgressBar>
  );
}

export default GomokuProgressBar;

const StyledGomokuProgressBar = styled.div`
  position: relative;
`;
