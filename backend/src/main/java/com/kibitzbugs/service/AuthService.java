package com.kibitzbugs.service;

import com.kibitzbugs.auth.JwtTokenProvider;
import com.kibitzbugs.dto.auth.*;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchAuthCodeReqDto;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchAuthCodeResDto;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchRefreshTokenReqDto;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchRefreshTokenResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    @Value("#{private['twitch.client-id']}")
    private String clientId;

    @Value("#{private['twitch.client-secret']}")
    private String clientSecret;

    @Value("#{private['twitch.redirect-uri']}")
    private String redirectUrl;

    private final JwtTokenProvider jwtTokenProvider;

    // code로 유저 액세스 토큰 및 리프레쉬 토큰 발급
    public AuthenticateUserResDto authenticateUser(String code) {

        TwitchAuthCodeReqDto twitchAuthCodeReqDto = TwitchAuthCodeReqDto.builder()
                .client_id(clientId)
                .client_secret(clientSecret)
                .grant_type("authorization_code")
                .code(code)
                .redirect_uri(redirectUrl)
                .build();

        URI uri = UriComponentsBuilder
                .fromUriString("https://id.twitch.tv")
                .path("/oauth2/token")
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<TwitchAuthCodeResDto> responseEntity = restTemplate.postForEntity(
                    uri,
                    twitchAuthCodeReqDto,
                    TwitchAuthCodeResDto.class);

            return AuthenticateUserResDto.builder()
                    .accessToken(responseEntity.getBody().getAccess_token())
                    .refreshToken(responseEntity.getBody().getRefresh_token())
                    .build();
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("code가 유효하지 않습니다.");
            }
        }
        return null;
    }

    // 인증된 유저 정보의 리프레시 토큰으로 갱신된 액세스 토큰 발급
    public RefreshTokenResDto refreshAccessToken() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        RestTemplate restTemplate = new RestTemplate();

        TwitchRefreshTokenReqDto twitchRefreshTokenReqDto = TwitchRefreshTokenReqDto.builder()
                .client_id(clientId)
                .client_secret(clientSecret)
                .grant_type("refresh_token")
                .refresh_token(authentication.getName())
                .build();

        URI uri = UriComponentsBuilder
                .fromUriString("https://id.twitch.tv")
                .path("/oauth2/token")
                .encode()
                .build()
                .toUri();

        try {
            ResponseEntity<TwitchRefreshTokenResDto> responseEntity = restTemplate.postForEntity(
                    uri,
                    twitchRefreshTokenReqDto,
                    TwitchRefreshTokenResDto.class);

            // 액세스 토큰과 리프레시 토큰 얻기
            TwitchRefreshTokenResDto twitchRefreshTokenResDto = responseEntity.getBody();

            // 리프레시 토큰 갱신
            String jwtToken = jwtTokenProvider.createToken(twitchRefreshTokenResDto.getRefresh_token(), authentication.getAuthorities());

            return new RefreshTokenResDto(
                    responseEntity.getBody().getAccess_token(),
                    jwtToken);
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("Refresh Token이 유효하지 않습니다.");
            }
        }
        return null;
    }
}
