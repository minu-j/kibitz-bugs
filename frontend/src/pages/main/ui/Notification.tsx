import { colorStyles } from "@/shared/ui";

function Notification() {
  return (
    <div
      css={{
        height: 64,
        display: "flex",
        gap: 6,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: "#F2F2F3",
        backgroundColor: colorStyles.primary,
      }}
    >
      🎉 Kibitz Bugs가 새롭게 업데이트 되었습니다!
      <a
        css={{
          color: "#F2F2F3",
          fontSize: 12,
        }}
        href="https://github.com/kibitz-bugs/kibitz-bugs/releases/tag/v1.0.0"
      >
        자세히 보기
      </a>
    </div>
  );
}

export default Notification;
