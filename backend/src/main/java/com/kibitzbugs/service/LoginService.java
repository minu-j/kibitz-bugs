package com.kibitzbugs.service;

import com.kibitzbugs.dto.auth.TwitchUserInfoResDto;
import com.kibitzbugs.dto.login.LoginCntResDto;
import com.kibitzbugs.dto.login.LoginHistoryReqDto;
import com.kibitzbugs.dto.login.LoginHistoryResDto;
import com.kibitzbugs.dto.login.TwitchChannelFollowersResDto;
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
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {

    final private LoginRepository loginRepository;
    final private TelegramService telegramService;

    @Value("#{private['twitch.client-id']}")
    private String clientId;

    // 로그인 기록 생성
    public LoginHistoryResDto createLoginHistory(LoginHistoryReqDto loginHistoryReqDto, String accessToken) {
        Login savedLogin = loginRepository.save(Login.builder()
                .streamerId(loginHistoryReqDto.getId())
                .name(loginHistoryReqDto.getName())
                .nickname(loginHistoryReqDto.getNickname())
                .imgUrl(loginHistoryReqDto.getImgUrl())
                .build()
        );

        // 팔로워 수 확인 후 알림
        RestTemplate restTemplate = new RestTemplate();
        URI uri = UriComponentsBuilder
                .fromUriString("https://api.twitch.tv")
                .path("/helix/channels/followers")
                .queryParam("broadcaster_id", loginHistoryReqDto.getId())
                .encode()
                .build()
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Client-Id", clientId);
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
        try {
            ResponseEntity<TwitchChannelFollowersResDto> responseEntity = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    requestEntity,
                    TwitchChannelFollowersResDto.class
            );
            if(responseEntity.getBody().getTotal() >= 10) {
                telegramService.sendMessage("[로그인] " + savedLogin.getNickname() + "%0A" +
                        "https://www.twitch.tv/" + savedLogin.getName());
            }
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("broadcaster id가 유효하지 않습니다.");
            }
        }

        log.info("[Login] " + savedLogin.getNickname());

        return LoginHistoryResDto.builder()
                .name(savedLogin.getName())
                .streamerId(savedLogin.getStreamerId())
                .nickname(savedLogin.getNickname())
                .imgUrl(savedLogin.getImgUrl())
                .build();
    }

    // 총 로그인 카운트 조회
    public LoginCntResDto getLoginCnt() {
        return LoginCntResDto.builder()
                .cnt(loginRepository.count())
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
