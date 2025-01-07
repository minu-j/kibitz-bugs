package com.kibitzbugs.service;

import com.kibitzbugs.dto.auth.AuthenticateUserResDto;
import com.kibitzbugs.dto.login.StreamerInfoDto;
import com.kibitzbugs.dto.thirdparty.naver.NaverChannelInfoResDto;
import com.kibitzbugs.dto.thirdparty.naver.NaverChannelPollingInfoResDto;
import com.kibitzbugs.dto.thirdparty.naver.NaverChatAccessTokenResDto;
import com.kibitzbugs.dto.thirdparty.naver.NaverUserInfoResDto;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchChannelFollowersResDto;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchUserInfoResDto;
import com.kibitzbugs.dto.login.LoginCntResDto;
import com.kibitzbugs.dto.login.LoginHistoryReqDto;
import com.kibitzbugs.dto.login.LoginHistoryResDto;
import com.kibitzbugs.entity.Login;
import com.kibitzbugs.enums.Provider;
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
    private String twitchClientId;

    @Value("#{private['naver.client-id']}")
    private String naverClientId;

    @Value("#{private['naver.client-secret']}")
    private String naverClientSecret;

    // 로그인 기록 생성
    @Transactional
    public LoginHistoryResDto createLoginHistory(LoginHistoryReqDto loginHistoryReqDto, String accessToken, Provider provider, String broadcastUrlId) {

        // 유저 로그인 기록 저장
        Login savedLogin = loginRepository.save(Login.builder()
                .streamerId(loginHistoryReqDto.getId())
                .nickname(loginHistoryReqDto.getNickname())
                .imgUrl(loginHistoryReqDto.getImgUrl())
                .build()
        );

        // 팔로워 수 확인 후 알림
        sendWebhook(loginHistoryReqDto.getId(), loginHistoryReqDto.getNickname(), provider, accessToken, broadcastUrlId);

        log.info("[Login] " + savedLogin.getNickname());

        // 로그인 기록 반환
        return LoginHistoryResDto.builder()
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
    public StreamerInfoDto getStreamerInfo(String accessToken, Provider provider) {
        return switch (provider) {
            case TWITCH -> getTwitchUserInfo(accessToken);
            case CHZZK -> getNaverUserInfo(accessToken);
        };
    }

    private StreamerInfoDto getTwitchUserInfo(String accessToken) {
        // url 설정
        URI uri = UriComponentsBuilder
            .fromUriString("https://api.twitch.tv")
            .path("/helix/users")
            .encode()
            .build()
            .toUri();

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Client-id", twitchClientId);
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<TwitchUserInfoResDto> responseEntity = restTemplate.exchange(
                uri, HttpMethod.GET, requestEntity, TwitchUserInfoResDto.class);
            return responseEntity.getBody().getData()[0].toStreamerInfo(accessToken);
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("토큰이 유효하지 않습니다.");
            }
        }
        return null;
    }

    private StreamerInfoDto getNaverUserInfo(String accessToken) {
        URI uri = UriComponentsBuilder
            .fromUriString("https://openapi.chzzk.naver.com")
            .path("/open/v1/users/me")
            .encode()
            .build()
            .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Content-Type", "application/json");
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        try {
            NaverUserInfoResDto.Content userInfo = restTemplate.exchange(
                uri, HttpMethod.GET, requestEntity, NaverUserInfoResDto.class).getBody().getContent();

            URI channelInfoUrl = UriComponentsBuilder
                .fromUriString("https://openapi.chzzk.naver.com")
                .path("/open/v1/channels")
                .query("channelIds=" + userInfo.getChannelId())
                .build()
                .toUri();

            HttpHeaders channelInfoHeaders = new HttpHeaders();
            channelInfoHeaders.set("Client-Id", naverClientId);
            channelInfoHeaders.set("Client-Secret", naverClientSecret);
            channelInfoHeaders.set("Content-Type", "application/json");
            HttpEntity<Void> channelInfoRequestEntity = new HttpEntity<>(channelInfoHeaders);

            NaverChannelInfoResDto.Content.Data channelInfo = restTemplate.exchange(
                channelInfoUrl, HttpMethod.GET, channelInfoRequestEntity, NaverChannelInfoResDto.class)
                .getBody().getContent().getData().get(0);

            URI channelPollingUrl = UriComponentsBuilder
                .fromUriString("https://api.chzzk.naver.com")
                .path("/polling/v2/channels/" + channelInfo.getChannelId() +"/live-status")
                .build()
                .toUri();

            String chatChannelId = restTemplate.exchange(
                    channelPollingUrl, HttpMethod.GET, HttpEntity.EMPTY, NaverChannelPollingInfoResDto.class)
                .getBody().getContent().getChatChannelId();

            URI chatAccessTokenUrl = UriComponentsBuilder
                .fromUriString("https://comm-api.game.naver.com")
                .path("/nng_main/v1/chats/access-token")
                .query("channelId=" + chatChannelId + "&chatType=STREAMING")
                .build()
                .toUri();

            String chatAccessToken = restTemplate.exchange(chatAccessTokenUrl, HttpMethod.GET, HttpEntity.EMPTY, NaverChatAccessTokenResDto.class)
                .getBody().getContent().getAccessToken();
            return channelInfo.toStreamerInfo(chatAccessToken);
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("토큰이 유효하지 않습니다.");
            }
        }
        return null;
    }

    private void sendWebhook(String id, String nickname, Provider provider, String accessToken, String broadcastUrlId) {
        Mono<Integer> followerCntMono = switch (provider) {
            case TWITCH -> getTwitchStreamerFollowers(id, accessToken);
            case CHZZK -> getNaverStreamerFollowers(id);
        };

        String broadcastUrl = switch (provider) {
            case TWITCH -> "https://www.twitch.tv/" + broadcastUrlId;
            case CHZZK -> "https://openapi.chzzk.naver.com/live/" + broadcastUrlId;
        };

        followerCntMono.subscribe(cnt -> {
            if (cnt >= 10) {
                telegramService.sendMessage("[로그인] " + nickname + "%0A" + broadcastUrl);
            }},
            throwable -> log.error("webflux error: " + throwable.getMessage(), throwable)
        );
    }

    private Mono<Integer> getTwitchStreamerFollowers(String id, String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Client-Id", twitchClientId);
        headers.add("Authorization", "Bearer " + accessToken);

        WebClient client = WebClient.builder()
            .baseUrl("https://api.twitch.tv")
            .build();

        return client.get()
            .uri(uriBuilder -> uriBuilder.path("/helix/channels/followers")
                .queryParam("broadcaster_id", id)
                .build()
            )
            .headers(httpHeaders -> httpHeaders.addAll(headers))
            .retrieve()
            .bodyToMono(TwitchChannelFollowersResDto.class)
            .map(TwitchChannelFollowersResDto::getTotal);
    }

    private Mono<Integer> getNaverStreamerFollowers(String id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Client-Id", naverClientId);
        headers.add("Client-Secret", naverClientSecret);
        headers.set("Content-Type", "application/json");

        WebClient client = WebClient.builder()
            .baseUrl("https://openapi.chzzk.naver.com")
            .build();

        return client.get()
            .uri(uriBuilder -> uriBuilder.path("/open/v1/channels")
                .queryParam("channelIds", id)
                .build()
            )
            .headers(httpHeaders -> httpHeaders.addAll(headers))
            .retrieve()
            .bodyToMono(NaverChannelInfoResDto.class)
            .map(dto -> dto.getContent().getData().get(0).getFollowerCount());
    }
}
