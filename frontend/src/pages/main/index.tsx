import { Header, Description, Footer } from "./ui";
import { LoginBtnGroup } from "@/features/login";
import { background } from "@/shared/resource/images";

function Main() {
  return (
    <div>
      <main
        css={{
          position: "relative",
          backgroundSize: "100% auto",
          backgroundImage: `url("${background}")`,
          overflowX: "hidden",
          minWidth: "375px",
        }}
      >
        <Header />
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div css={{ marginBottom: "80px" }}>
            <LoginBtnGroup />
          </div>
          <Description />
          <LoginBtnGroup />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Main;
