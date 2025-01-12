package com.kibitzbugs.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kibitzbugs.auth.CookieProvider;
import com.kibitzbugs.auth.JwtTokenProvider;
import com.kibitzbugs.auth.ProviderTokenPair;
import com.kibitzbugs.dto.auth.AuthenticateUserReqDto;
import com.kibitzbugs.dto.auth.AuthenticateUserResDto;
import com.kibitzbugs.dto.auth.ProvidersInfoResDto;
import com.kibitzbugs.dto.auth.RefreshTokenResDto;
import com.kibitzbugs.dto.login.StreamerInfoDto;
import com.kibitzbugs.dto.login.LoginHistoryReqDto;
import com.kibitzbugs.enums.Provider;
import com.kibitzbugs.service.AuthService;
import com.kibitzbugs.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth")
public class AuthController {

    private final AuthService authService;
    private final LoginService loginService;
    private final JwtTokenProvider jwtTokenProvider;
    private final CookieProvider cookieProvider;

    @PostMapping("/code")
    @Operation(summary = "유저 인증", description = "트위치 로그인 시 code로 유저 인증")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "OK",
            headers = {
                @Header(name = "ACCESS_TOKEN", description = "Access Token"),
                @Header(name = "Set-Cookie", description = "JWT Refresh Token")
            }),
        @ApiResponse(responseCode = "401", description = "code가 유효하지 않습니다.")
    })
    public ResponseEntity<ProvidersInfoResDto> authenticateUser(
        HttpServletResponse response,
        @Valid @RequestBody AuthenticateUserReqDto request
    ) {
        List<Provider> providers = new ArrayList<>();
        Map<Provider, StreamerInfoDto> streamerInfoMap = new HashMap<>();
        Map<Provider, String> jwtTokenMap = new HashMap<>();

        try {
            // code로 액세스 토큰 및 리프레시 토큰 얻기
            AuthenticateUserResDto authenticateUserResDto = authService.authenticateUser(request.getCode(), request.getProvider(), request.getState());

            // 액세스 토큰으로 유저 정보 얻기
            StreamerInfoDto streamerInfo = loginService.getStreamerInfo(authenticateUserResDto.getAccessToken(), request.getProvider());

            // 로그인 기록 저장 및 알림
            loginService.createLoginHistory(LoginHistoryReqDto.builder()
                .id(streamerInfo.getId())
                .nickname(streamerInfo.getNickname())
                .imgUrl(streamerInfo.getImageUrl())
                .build(), authenticateUserResDto.getAccessToken(), request.getProvider(), streamerInfo.getBroadcastUrlId());

            // 리프레시 토큰으로 JWT 생성
            String jwtToken = jwtTokenProvider.createToken(authenticateUserResDto.getRefreshToken());

            providers.add(request.getProvider());
            streamerInfoMap.put(request.getProvider(), streamerInfo);
            jwtTokenMap.put(request.getProvider(), jwtToken);
        } catch (Exception e) {}

        ProvidersInfoResDto providersInfo =
            getProvidersInfo(request.getProvider(), providers, streamerInfoMap, jwtTokenMap, response);

        return new ResponseEntity<>(providersInfo, HttpStatus.OK);
    }

    @PostMapping("/refresh")
    @Operation(
        summary = "액세스 토큰 갱신",
        description = "액세스 토큰 만료 시 새로운 액세스 토큰 발급",
        security = {@SecurityRequirement(name = "Basic Auth")}
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "OK",
            headers = {@Header(name = "ACCESS_TOKEN", description = "Access Token")}
        )
    })
    public ResponseEntity<ProvidersInfoResDto> refreshAccessToken(
        HttpServletResponse response
    ) {
        List<Provider> providers = new ArrayList<>();
        Map<Provider, StreamerInfoDto> streamerInfoMap = new HashMap<>();
        Map<Provider, String> jwtTokenMap = new HashMap<>();

        ProvidersInfoResDto providersInfo =
            getProvidersInfo(null, providers, streamerInfoMap, jwtTokenMap, response);

        return new ResponseEntity<>(providersInfo, HttpStatus.OK);
    }

    private ProvidersInfoResDto getProvidersInfo(
        Provider loginAttemptedProvider,
        List<Provider> providers,
        Map<Provider, StreamerInfoDto> streamerInfoMap,
        Map<Provider, String> jwtTokenMap,
        HttpServletResponse response
    ) {
        // 기존 로그인했던 provider 정보 가져오기
        SecurityContextHolder.getContext().getAuthentication().getAuthorities()
            .stream()
            .map(GrantedAuthority::getAuthority)
            .map(ProviderTokenPair::from)
            .filter(pair -> {
                if (pair == null) return false;
                return !pair.getProvider().equals(loginAttemptedProvider);
            })
            .forEach(pair -> {
                try {
                    RefreshTokenResDto tokenInfo = authService.refreshAccessToken(pair.getProvider());
                    StreamerInfoDto streamerInfo = loginService.getStreamerInfo(tokenInfo.getAccessToken(), pair.getProvider());
                    providers.add(pair.getProvider());
                    streamerInfoMap.put(pair.getProvider(), streamerInfo);
                    jwtTokenMap.put(pair.getProvider(), tokenInfo.getJwtRefreshToken());
                } catch (Exception e) {}
            });

        // 쿠키에 JWT 토큰 담기
        jwtTokenMap.forEach((key, value) -> cookieProvider.setRefreshToken(response, value, key));

        ProvidersInfoResDto providersInfoResDto = new ProvidersInfoResDto();
        providers.forEach(provider -> providersInfoResDto.updateProviderInfo(streamerInfoMap.get(provider), provider));
        return providersInfoResDto;
    }
}
