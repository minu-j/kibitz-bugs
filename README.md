![cover image](./assets/coverImg.png)

# Kibitz bugs

🔗 https://kibitz-bugs.xyz/

## release note

**v0.1.2**

2023.10.1.

- 타이머 사운드 추가
- 인게임 버튼 UI 개선

**v0.1.1**

2023.9.8.

- 중복투표 방지 기능 추가
- 네트워크 사용량 및 성능 최적화
  - 11.4MB -> 1.3MB
- 채팅창 투표 적용 여부 표시기능 추가
- 기타 성능 최적화

**v0.1.0**

2023.9.6.

- 트위치 OAuth 인증 로그인
- 시청자 댓글 참여 오목 게임
  - 오목 알고리즘(렌주룰 완전 지원)
- 트위치 댓글 연동(tmi.js)
- 성능 최적화
  - 투표 집계 스로틀링(500ms)
  - 애니메이션 최적화

## 🎬 프로젝트 기간

2023.08.15(화) ~

## 📜 개요

"Kibitz bugs"는 스트리머와 시청자가 함께 즐기는 보드게임입니다.

댓글 투표로 시청자의 선택이 결정됩니다.

집단지성으로 스트리머와 두뇌싸움을 펼쳐보세요!

## 🛠️ 주요기술

**Front-end**

```
- Vite(React + Typescript)
- Recoil
- React-Router-Dom
- Axios
- Web-Socket
- emotion
- SEO(Open Graph)
- OAuth(twitch)
```

**Back-end**

```
- Springboot 2.7.10
- Spring Data JPA
- MariaDB
```

**Infrastructure**

```
- AWS EC2
- Nginx
```

## ✔ 팀원 역할

| 성명   | 담당             | github                     |
| ------ | ---------------- | -------------------------- |
| 정민우 | Front-end        | https://github.com/minu-j  |
| 윤성운 | Back-end & Infra | https://github.com/ysu6691 |

## 🛠️ 스크린샷

![screenshot 1](./assets/screenshot1.png)
![screenshot 2](./assets/screenshot2.png)
![screenshot 3](./assets/screenshot3.png)
