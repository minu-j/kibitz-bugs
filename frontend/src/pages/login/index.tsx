import {
  chzzkLogo,
  soopLogo,
  twitchLogo,
  youtubeLogo,
} from "@/shared/resource/images";
import { AspectRatioLayout, LargeBtn, SmallBtn, textStyles } from "@/shared/ui";

function Login() {
  return (
    <AspectRatioLayout>
      <div
        css={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 52,
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          <h1 css={{ ...textStyles.title1 }}>채팅 연동</h1>
          <div css={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p
              css={{
                ...textStyles.contents,
                textAlign: "center",
              }}
            >
              원하는 서비스에 로그인하여 방송 채팅을 연동하세요. 적어도 한개의
              계정에 로그인 해야합니다.
            </p>
            <p
              css={{
                ...textStyles.contents,
                textAlign: "center",
              }}
            >
              사용자 프로필과 닉네임은 가장 처음 로그인한 계정으로 등록됩니다.
            </p>
            <p
              css={{
                ...textStyles.contents,
                textAlign: "center",
              }}
            >
              계정 로그인 시,{" "}
              <a href="https://kibitz-bugs.xyz/terms/">개인정보 처리방침</a>에
              동의한 것으로 간주합니다.
            </p>
          </div>
        </div>
        <div
          css={{
            display: "flex",
            gap: 120,
          }}
        >
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <img
              style={{ width: 64, height: 64 }}
              src={chzzkLogo}
              alt="chzzkLogo"
            />
            <span css={{ ...textStyles.title3 }}>치지직</span>
            <SmallBtn label="로그인" onClick={() => {}} />
          </div>

          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: 64, height: 64 }}
              src={youtubeLogo}
              alt="youtubeLogo"
            />
            <span css={{ ...textStyles.title3 }}>유튜브</span>
            <SmallBtn label="로그인" onClick={() => {}} />
          </div>

          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: 64, height: 64 }}
              src={soopLogo}
              alt="soopLogo"
            />
            <span css={{ ...textStyles.title3 }}>숲</span>
            <SmallBtn label="로그인" onClick={() => {}} />
          </div>

          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: 64, height: 64 }}
              src={twitchLogo}
              alt="twitchLogo"
            />
            <span css={{ ...textStyles.title3 }}>트위치</span>
            <SmallBtn label="로그인" onClick={() => {}} />
          </div>
        </div>
        <LargeBtn label="완료" onClick={() => {}} />
      </div>
    </AspectRatioLayout>
  );
}

export default Login;
