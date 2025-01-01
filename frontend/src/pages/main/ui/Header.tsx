import { textShadowStyles, textStyles } from "@/shared/ui";

import CartoonEffect1 from "./cartoon_effect_1.svg";
import CartoonEffect2 from "./cartoon_effect_2.svg";
import CartoonEffect3 from "./cartoon_effect_3.svg";
import CartoonEffect4 from "./cartoon_effect_4.svg";
import CartoonEffectDot1 from "./cartoon_effect_dot_1.svg";
import CartoonEffectDot2 from "./cartoon_effect_dot_2.svg";
import CartoonEffectDot3 from "./cartoon_effect_dot_3.svg";
import CartoonEffectDot4 from "./cartoon_effect_dot_4.svg";
import CartoonLogo from "./cartoon_logo.svg";
import CartoonStones from "./cartoon_stones.svg";
function Header() {
  return (
    <div
      css={{
        width: "100%",
        height: "480px",
        position: "relative",
        overflow: "visible",
        "@media (max-width: 640px)": {
          height: "400px",
        },
      }}
    >
      <div
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",

          img: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            "@media (max-width: 640px)": {
              transform: "translate(-50%, -50%) scale(0.5)",
            },

            "@media (min-width: 641px)": {
              "&.animate-img": {
                animation: "float 30s linear infinite both",
                "@keyframes float": {
                  "0%": {
                    transform: "translate(-50%, -50%) scale(0.5)",
                    opacity: 0,
                  },
                  "40%": {
                    transform: "translate(-50%, -50%) scale(0.7)",
                    opacity: 0,
                  },
                  "60%": {
                    opacity: 1,
                  },
                  "80%": {
                    opacity: 1,
                  },
                  "100%": {
                    transform: "translate(-50%, -50%) scale(0.8)",
                    opacity: 0,
                  },
                },
              },
            },
          },
        }}
      >
        <img
          className="animate-img"
          src={CartoonEffect1}
          alt="cartoon effect 1"
          style={{ animationDelay: "-30s" }}
        />
        <img
          className="animate-img"
          src={CartoonEffect2}
          alt="cartoon effect 2"
          style={{ animationDelay: "-20s" }}
        />
        <img
          className="animate-img"
          src={CartoonEffect3}
          alt="cartoon effect 3"
          style={{ animationDelay: "-15s" }}
        />
        <img
          className="animate-img"
          src={CartoonEffect4}
          alt="cartoon effect 4"
          style={{ animationDelay: "-10s" }}
        />
        <img
          className="animate-img"
          src={CartoonEffectDot1}
          alt="cartoon effect dot 1"
          style={{ animationDelay: "-25s" }}
        />
        <img
          className="animate-img"
          src={CartoonEffectDot2}
          alt="cartoon effect dot 2"
          style={{ animationDelay: "-17s" }}
        />
        <img
          className="animate-img"
          src={CartoonEffectDot3}
          alt="cartoon effect dot 3"
          style={{ animationDelay: "-8s" }}
        />
        <img
          className="animate-img"
          src={CartoonEffectDot4}
          alt="cartoon effect dot 4"
          style={{ animationDelay: "-0s" }}
        />
        <img
          src={CartoonStones}
          alt="cartoon stones"
          css={{
            animation: `breath-stone 1.5s alternate ease-in-out infinite`,
            "@keyframes breath-stone": {
              from: {
                transform: "translate(-50%, -50%) scale(1.005)",
              },
              to: {
                transform: "translate(-50%, -50%) scale(0.995)",
              },
            },
            width: "50vw",
            minWidth: 1200,
          }}
        />
      </div>
      <header
        css={{
          marginBlock: 48,
          position: "relative",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          css={{
            animation: `breath-logo 1.5s alternate ease-in-out infinite`,
            "@keyframes breath-logo": {
              from: {
                transform: "scale(1.01)",
              },
              to: {
                transform: "scale(0.99)",
              },
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: 600,
            marginBottom: 24,
          }}
        >
          <img
            css={{
              width: "70%",
            }}
            src={CartoonLogo}
            alt={`logo image`}
          />
        </div>
      </header>
      <div
        css={{
          position: "absolute",
          "@media (min-width: 641px)": {
            bottom: -70,
            left: -180,
          },
          "@media (max-width: 640px)": {
            bottom: -40,
            left: -15,
          },
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...textStyles.title2,
          span: {
            color: "#2D2E38",
            textShadow: textShadowStyles.outline,
          },
        }}
      >
        <div
          css={{
            "@media (min-width: 641px)": {
              transform: "rotate(-12deg)",
            },
          }}
        >
          <div css={{ fontSize: 25, animation: "popIn 0.5s ease-in-out" }}>
            <span>스트리머와 시청자의</span>
          </div>
          <div
            css={{
              fontSize: 32,
              animation: "popIn 0.5s ease-in-out both",
              marginLeft: 12,
            }}
            style={{ animationDelay: "0.5s" }}
          >
            <span>집단지성 오목 대결!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
