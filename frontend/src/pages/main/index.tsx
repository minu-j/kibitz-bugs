import { Header, Description, Footer } from "./ui";
import { SelectLocales } from "@/shared/i18n";
import LoginBtnGroup from "@/entities/auth/ui/LoginBtnGroup";
import { background } from "@/shared/resource/images";

function Main() {
  return (
    <main
      css={{
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
        <div css={{ marginBottom: "20px" }}>
          <LoginBtnGroup />
        </div>
        <SelectLocales />
        <Description />
        <LoginBtnGroup />
        <Footer />
      </div>
    </main>
  );
}

export default Main;
