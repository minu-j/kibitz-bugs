import Logo from "@assets/images/Logo.png";
import { textStyles } from "@styles";

function Header() {
  return (
    <header
      css={{
        marginBlock: 48,
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        css={{
          animation: `breath 2s alternate ease-in-out infinite`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 200,
          marginBottom: 24,
        }}
      >
        <img
          css={{
            width: "100%",
          }}
          src={Logo}
          alt={`logo image`}
        />
        <h1 css={textStyles.title2}>{"키비츠 벅스"}</h1>
      </div>
      <h2 css={textStyles.title3}>스트리머와 시청자의 오목 대결!</h2>
    </header>
  );
}

export default Header;
