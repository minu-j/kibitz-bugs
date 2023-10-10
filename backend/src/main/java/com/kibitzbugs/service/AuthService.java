package com.kibitzbugs.service;

import com.kibitzbugs.auth.JwtTokenProvider;
import com.kibitzbugs.dto.auth.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.security.Principal;

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
                    .jwtRefreshToken(jwtTokenProvider.createToken(responseEntity.getBody().getRefresh_token()))
                    .build();
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("code가 유효하지 않습니다.");
            }
        }
        return null;
    }

    // 인증된 유저 정보의 리프레시 토큰으로 갱신된 액세스 토큰 발급
    public String refreshAccessToken(Principal principal) {

        TwitchRefreshTokenReqDto twitchRefreshTokenReqDto = TwitchRefreshTokenReqDto.builder()
                .client_id(clientId)
                .client_secret(clientSecret)
                .grant_type("refresh_token")
                .refresh_token(principal.getName())
                .build();

        URI uri = UriComponentsBuilder
                .fromUriString("https://id.twitch.tv")
                .path("/oauth2/token")
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<TwitchRefreshTokenResDto> responseEntity = restTemplate.postForEntity(
                    uri,
                    twitchRefreshTokenReqDto,
                    TwitchRefreshTokenResDto.class);

            return responseEntity.getBody().getAccess_token();
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("Refresh Token이 유효하지 않습니다.");
            }
        }
        return null;
    }
}
