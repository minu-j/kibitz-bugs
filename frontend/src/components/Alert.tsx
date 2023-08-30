import { textStyles } from "@/styles";
import cargoonBox from "@assets/images/cartoonBox.svg";

interface IAlertProps {
  body: string;
  onClick(e: React.MouseEvent): void;
  onCancleClick?(e: React.MouseEvent): void;
}

function Alert({ body, onClick, onCancleClick }: IAlertProps) {
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
            ...textStyles.contents,
          }}
        >
          {body}
        </div>
        <div>
          <button
            css={{
              cursor: "pointer",
              border: "none",
              background: "none",
              ":hover": {
                transform: `scale(1.03)`,
              },
              ...textStyles.contents,
            }}
            onClick={onClick}
          >
            확인
          </button>
          {onCancleClick ? (
            <button
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
              onClick={onCancleClick}
            >
              취소
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Alert;