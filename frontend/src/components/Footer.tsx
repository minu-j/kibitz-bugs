import { colorStyles } from "@/styles";
import { BsGithub } from "react-icons/bs";

function Footer() {
  const appVersion = import.meta.env.VITE_REACT_APP_VERSION;
  return (
    <div
      css={{
        position: "fixed",
        bottom: 40,
        right: 40,
        fontSize: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        textAlign: "right",
      }}
    >
      <div
        css={{
          width: "100%",
        }}
      >
        <p>{`ver.${appVersion}`}</p>
        <span>Developed by</span>
        <a href="https://github.com/ysu6691"> ysu6691,</a>
        <a href="https://github.com/minu-j"> minu-j</a>
      </div>
      <a
        css={{
          width: "100%",
          marginBlock: 5,
          display: "flex",
          justifyContent: "end",
        }}
        href="https://github.com/minu-j/kibitz-bugs"
      >
        <BsGithub
          css={{
            marginRight: 1,
          }}
        />
        Github
      </a>
      <p css={{ color: colorStyles.lightGray }}>
        Image by rawpixel.com on Freepik
      </p>
    </div>
  );
}

export default Footer;
