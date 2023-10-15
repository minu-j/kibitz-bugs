import { textStyles } from "@/styles";
import cargoonBox from "@assets/images/cartoonBox.svg";
import click from "@assets/audios/click.mp3";
import hover from "@assets/audios/hover.mp3";
import { useTranslation } from "react-i18next";

interface IAlertProps {
  body: string;
  onClick(e: React.MouseEvent): void;
  onCancleClick?(e: React.MouseEvent): void;
}

const clickSound = new Audio(click);
const hoverSound = new Audio(hover);

function Alert({ body, onClick, onCancleClick }: IAlertProps) {
  const { t } = useTranslation();
  return (
    <div
      css={{
        zIndex: 99,
        position: "fixed",
        width: "1000vw",
        height: "1000vh",
        backgroundColor: "rgba(0, 0, 0, 0.30)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        css={{
          zIndex: 100,
          width: 380,
          height: 296,
          padding: 40,
          backgroundImage: `url(${cargoonBox})`,
          backgroundSize: "cover",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-0.005turn)",
          transition: `all 0.3s`,
          ":hover": {
            zIndex: 1,
            transform: `translate(-50%, -50%) rotate(-0.01turn) scale(1.03)`,
          },
        }}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            lineHeight: 1.4,
            ...textStyles.contents,
          }}
        >
          {body}
        </div>
        <div>
          <button
            onMouseEnter={() => hoverSound.play()}
            onMouseLeave={() => {
              hoverSound.pause();
              hoverSound.currentTime = 0;
            }}
            css={{
              cursor: "pointer",
              border: "none",
              background: "none",
              ":hover": {
                transform: `scale(1.03)`,
              },
              ...textStyles.contents,
            }}
            onClick={(e) => {
              onClick(e);
              clickSound.play();
            }}
          >
            {t("components.alert.yes")}
          </button>
          {onCancleClick ? (
            <button
              onMouseEnter={() => hoverSound.play()}
              onMouseLeave={() => {
                hoverSound.pause();
                hoverSound.currentTime = 0;
              }}
              css={{
                cursor: "pointer",
                border: "none",
                background: "none",
                marginLeft: 20,
                ":hover": {
                  transform: `scale(1.03)`,
                },
                ...textStyles.contents,
              }}
              onClick={(e) => {
                onCancleClick(e);
                clickSound.play();
              }}
            >
              {t("components.alert.cancel")}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Alert;
