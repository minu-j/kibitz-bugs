package com.kibitzbugs.service;

import com.kibitzbugs.dto.thirdparty.twitch.TwitchChannelFollowersResDto;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchUserInfoResDto;
import com.kibitzbugs.dto.login.LoginCntResDto;
import com.kibitzbugs.dto.login.LoginHistoryReqDto;
import com.kibitzbugs.dto.login.LoginHistoryResDto;
import com.kibitzbugs.entity.Login;
import com.kibitzbugs.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {

    final private LoginRepository loginRepository;
    final private TelegramService telegramService;

    @Value("#{private['twitch.client-id']}")
    private String clientId;

    // 로그인 기록 생성
    @Transactional
    public LoginHistoryResDto createLoginHistory(LoginHistoryReqDto loginHistoryReqDto, String accessToken) {

        // 유저 로그인 기록 저장
        Login savedLogin = loginRepository.save(Login.builder()
                .streamerId(loginHistoryReqDto.getId())
                .name(loginHistoryReqDto.getName())
                .nickname(loginHistoryReqDto.getNickname())
                .imgUrl(loginHistoryReqDto.getImgUrl())
                .build()
        );

        // 팔로워 수 확인 후 알림
        HttpHeaders headers = new HttpHeaders();
        headers.add("Client-Id", clientId);
        headers.add("Authorization", "Bearer " + accessToken);

        WebClient client = WebClient.builder()
                .baseUrl("https://api.twitch.tv")
                .build();

        Mono<TwitchChannelFollowersResDto> twitchChannelFollowersResDtoMono
                = client.get()
                .uri(uriBuilder -> uriBuilder.path("/helix/channels/followers")
                        .queryParam("broadcaster_id", loginHistoryReqDto.getId())
                        .build())
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(TwitchChannelFollowersResDto.class);

        twitchChannelFollowersResDtoMono.subscribe(
                twitchChannelFollowersResDto -> {
                    if (twitchChannelFollowersResDto.getTotal() >= 10) {
                        telegramService.sendMessage("[로그인] " + savedLogin.getNickname() + "%0A" +
                                "https://www.twitch.tv/" + savedLogin.getName());
                    }
                },
                throwable -> log.error("webflux error: " + throwable.getMessage(), throwable)
        );

        log.info("[Login] " + savedLogin.getNickname());

        // 로그인 기록 반환
        return LoginHistoryResDto.builder()
                .name(savedLogin.getName())
                .streamerId(savedLogin.getStreamerId())
                .nickname(savedLogin.getNickname())
                .imgUrl(savedLogin.getImgUrl())
                .build();
    }

    // 총 로그인 카운트 조회
    public LoginCntResDto getLoginCnt() {
        Optional<Login> optionalLogin = loginRepository.findFirstByOrderByIdDesc();
        return LoginCntResDto.builder()
                .cnt(optionalLogin.isPresent() ? optionalLogin.get().getId() : 0)
                .build();
    }

    // 액세스 토큰으로 유저 정보 얻기
    public TwitchUserInfoResDto.Data getTwitchUserInfo(String accessToken) {
        // url 설정
        URI uri = UriComponentsBuilder
                .fromUriString("https://api.twitch.tv")
                .path("/helix/users")
                .encode()
                .build()
                .toUri();

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Client-id", clientId);
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<TwitchUserInfoResDto> responseEntity = restTemplate.exchange(
                    uri, HttpMethod.GET, requestEntity, TwitchUserInfoResDto.class);
            return responseEntity.getBody().getData()[0];
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("토큰이 유효하지 않습니다.");
            }
        }
        return null;
    }
}
