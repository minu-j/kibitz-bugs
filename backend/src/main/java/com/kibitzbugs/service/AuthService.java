package com.kibitzbugs.service;

import com.kibitzbugs.auth.JwtTokenProvider;
import com.kibitzbugs.dto.auth.*;
import com.kibitzbugs.dto.thirdparty.CommonTokenResDto;
import com.kibitzbugs.dto.thirdparty.naver.NaverAuthCodeReqDto;
import com.kibitzbugs.dto.thirdparty.naver.NaverAuthCodeResDto;
import com.kibitzbugs.dto.thirdparty.naver.NaverRefreshTokenReqDto;
import com.kibitzbugs.dto.thirdparty.naver.NaverRefreshTokenResDto;
import com.kibitzbugs.dto.thirdparty.soop.SoopAuthCodeReqDto;
import com.kibitzbugs.dto.thirdparty.soop.SoopAuthCodeResDto;
import com.kibitzbugs.dto.thirdparty.soop.SoopRefreshTokenReqDto;
import com.kibitzbugs.dto.thirdparty.soop.SoopRefreshTokenResDto;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchAuthCodeReqDto;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchAuthCodeResDto;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchRefreshTokenReqDto;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchRefreshTokenResDto;
import com.kibitzbugs.enums.Provider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
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
    private String twitchClientId;

    @Value("#{private['twitch.client-secret']}")
    private String twitchClientSecret;

    @Value("#{private['twitch.redirect-uri']}")
    private String twitchRedirectUrl;

    @Value("#{private['naver.client-id']}")
    private String naverClientId;

    @Value("#{private['naver.client-secret']}")
    private String naverClientSecret;

    @Value("#{private['naver.redirect-uri']}")
    private String naverRedirectUri;

    @Value("#{private['soop.client-id']}")
    private String soopClientId;

    @Value("#{private['soop.client-secret']}")
    private String soopClientSecret;

    @Value("#{private['soop.redirect-uri']}")
    private String soopRedirectUri;

    private final JwtTokenProvider jwtTokenProvider;

    // code로 유저 액세스 토큰 및 리프레쉬 토큰 발급
    public AuthenticateUserResDto authenticateUser(String code, Provider provider, String state) {
        return switch (provider) {
            case TWITCH -> authenticateTwitchUserWithCode(code);
            case CHZZK -> authenticateNaverUserWithCode(code, state);
            case SOOP -> authenticateSoopUserWithCode(code);
        };
    }

    // 인증된 유저 정보의 리프레시 토큰으로 갱신된 액세스 토큰 발급
    public RefreshTokenResDto refreshAccessToken(Provider provider) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String refreshToken = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .filter(authority -> authority.startsWith(provider.toString()))
            .map(authority -> authority.substring((provider + "-").length()))
            .findFirst()
            .orElseThrow(() -> new AuthenticationServiceException("인증되지 않은 유저입니다."));
        CommonTokenResDto updatedTokens = switch (provider) {
            case TWITCH -> getTwitchRefreshToken(refreshToken);
            case CHZZK -> getNaverRefreshToken(refreshToken);
            case SOOP -> getSoopRefreshToken(refreshToken);
        };

        // 리프레시 토큰 갱신
        String jwtToken = jwtTokenProvider.createToken(updatedTokens.getRefreshToken());
        return new RefreshTokenResDto(updatedTokens.getAccessToken(), jwtToken);
    }

    private AuthenticateUserResDto authenticateTwitchUserWithCode(String code) {
        TwitchAuthCodeReqDto twitchAuthCodeReqDto = TwitchAuthCodeReqDto.builder()
            .client_id(twitchClientId)
            .client_secret(twitchClientSecret)
            .grant_type("authorization_code")
            .code(code)
            .redirect_uri(twitchRedirectUrl)
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

    private AuthenticateUserResDto authenticateNaverUserWithCode(String code, String state) {
        NaverAuthCodeReqDto naverAuthCodeReqDto = NaverAuthCodeReqDto.builder()
            .grantType("authorization_code")
            .clientId(naverClientId)
            .clientSecret(naverClientSecret)
            .code(code)
            .state(state)
            .build();

        URI uri = UriComponentsBuilder
                .fromUriString("https://chzzk.naver.com")
                .path("/auth/v1/token")
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<NaverAuthCodeResDto> responseEntity = restTemplate.postForEntity(
                uri,
                naverAuthCodeReqDto,
                NaverAuthCodeResDto.class);

            return AuthenticateUserResDto.builder()
                .accessToken(responseEntity.getBody().getContent().getAccessToken())
                .refreshToken(responseEntity.getBody().getContent().getRefreshToken())
                .build();
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("code가 유효하지 않습니다.");
            }
        }
        return null;
    }

    private AuthenticateUserResDto authenticateSoopUserWithCode(String code) {
        SoopAuthCodeReqDto soopAuthCodeReqDto = SoopAuthCodeReqDto.builder()
            .grantType("authorization_code")
            .clientId(soopClientId)
            .clientSecret(soopClientSecret)
            .redirectUri(soopRedirectUri)
            .code(code)
            .build();

        URI uri = UriComponentsBuilder
            .fromUriString("https://openapi.sooplive.co.kr")
            .path("/auth/token")
            .encode()
            .build()
            .toUri();

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<SoopAuthCodeResDto> responseEntity = restTemplate.postForEntity(
                uri,
                soopAuthCodeReqDto,
                SoopAuthCodeResDto.class);

            return AuthenticateUserResDto.builder()
                .accessToken(responseEntity.getBody().getAccessToken())
                .refreshToken(responseEntity.getBody().getRefreshToken())
                .build();
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("code가 유효하지 않습니다.");
            }
        }
        return null;
    }

    private CommonTokenResDto getTwitchRefreshToken(String refreshToken) {
        RestTemplate restTemplate = new RestTemplate();

        TwitchRefreshTokenReqDto twitchRefreshTokenReqDto = TwitchRefreshTokenReqDto.builder()
            .client_id(twitchClientId)
            .client_secret(twitchClientSecret)
            .grant_type("refresh_token")
            .refresh_token(refreshToken)
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

            // 리프레시 토큰 얻기
            TwitchRefreshTokenResDto twitchRefreshTokenResDto = responseEntity.getBody();
            return twitchRefreshTokenResDto.toCommonDto();
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("Refresh Token이 유효하지 않습니다.");
            }
        }
        return null;
    }

    private CommonTokenResDto getNaverRefreshToken(String refreshToken) {
        RestTemplate restTemplate = new RestTemplate();

        NaverRefreshTokenReqDto naverRefreshTokenReqDto = NaverRefreshTokenReqDto.builder()
            .clientId(naverClientId)
            .clientSecret(naverClientSecret)
            .grantType("refresh_token")
            .refreshToken(refreshToken)
            .build();

        URI uri = UriComponentsBuilder
            .fromUriString("https://openapi.chzzk.naver.com")
            .path("/auth/v1/token")
            .encode()
            .build()
            .toUri();

        try {
            ResponseEntity<NaverRefreshTokenResDto> responseEntity = restTemplate.postForEntity(
                uri,
                naverRefreshTokenReqDto,
                NaverRefreshTokenResDto.class);

            // 리프레시 토큰 얻기
            NaverRefreshTokenResDto naverRefreshTokenResDto = responseEntity.getBody();
            return naverRefreshTokenResDto.toCommonDto();
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("Refresh Token이 유효하지 않습니다.");
            }
        }
        return null;
    }

    private CommonTokenResDto getSoopRefreshToken(String refreshToken) {
        SoopRefreshTokenReqDto soopAuthCodeReqDto = SoopRefreshTokenReqDto.builder()
            .grantType("refresh_token")
            .clientId(soopClientId)
            .clientSecret(soopClientSecret)
            .redirectUri(soopRedirectUri)
            .refreshToken(refreshToken)
            .build();

        URI uri = UriComponentsBuilder
            .fromUriString("https://openapi.sooplive.co.kr")
            .path("/auth/token")
            .encode()
            .build()
            .toUri();

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<SoopRefreshTokenResDto> responseEntity = restTemplate.postForEntity(
                uri,
                soopAuthCodeReqDto,
                SoopRefreshTokenResDto.class);

            return CommonTokenResDto.builder()
                .accessToken(responseEntity.getBody().getAccessToken())
                .refreshToken(responseEntity.getBody().getRefreshToken())
                .build();
        } catch (HttpClientErrorException e) {
            if(e.getStatusCode().is4xxClientError()) {
                throw new AuthenticationServiceException("code가 유효하지 않습니다.");
            }
        }
        return null;
    }
}
