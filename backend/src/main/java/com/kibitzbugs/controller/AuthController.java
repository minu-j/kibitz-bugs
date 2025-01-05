package com.kibitzbugs.controller;

import com.kibitzbugs.auth.CookieProvider;
import com.kibitzbugs.auth.JwtTokenProvider;
import com.kibitzbugs.dto.auth.AuthenticateUserReqDto;
import com.kibitzbugs.dto.auth.AuthenticateUserResDto;
import com.kibitzbugs.dto.auth.RefreshTokenReqDto;
import com.kibitzbugs.dto.auth.RefreshTokenResDto;
import com.kibitzbugs.dto.login.StreamerInfoDto;
import com.kibitzbugs.dto.login.LoginHistoryReqDto;
import com.kibitzbugs.dto.login.LoginHistoryResDto;
import com.kibitzbugs.service.AuthService;
import com.kibitzbugs.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            @ApiResponse(responseCode = "200",
                    description = "OK",
                    headers = {@Header(name = "ACCESS_TOKEN", description = "Access Token"),
                            @Header(name = "Set-Cookie", description = "JWT Refresh Token")}),
            @ApiResponse(responseCode = "401", description = "code가 유효하지 않습니다.")
    })
    // 응답 헤더 ACCESS-TOKEN, 쿠키 REFRESH-TOKEN 추가
    public ResponseEntity<LoginHistoryResDto> authenticateUser(HttpServletResponse response,
        @Valid @RequestBody AuthenticateUserReqDto request) {

        // code로 액세스 토큰 및 리프레시 토큰 얻기
        AuthenticateUserResDto authenticateUserResDto = authService.authenticateUser(request.getCode(), request.getProvider(), request.getState());

        // 액세스 토큰으로 유저 정보 얻기
        StreamerInfoDto streamerInfo = loginService.getStreamerInfo(authenticateUserResDto.getAccessToken(), request.getProvider());

        // 로그인 기록 저장 및 알림
        LoginHistoryResDto loginHistoryResDto = loginService.createLoginHistory(LoginHistoryReqDto.builder()
                .id(streamerInfo.getId())
                .nickname(streamerInfo.getNickname())
                .imgUrl(streamerInfo.getImageUrl())
                .build(), authenticateUserResDto.getAccessToken(), request.getProvider(), streamerInfo.getBroadcastUrlId());

        // 리프레시 토큰으로 JWT 생성
        String jwtToken = jwtTokenProvider.createToken(authenticateUserResDto.getRefreshToken());

        // 헤더에 액세스 토큰 담기
        HttpHeaders headers = new HttpHeaders();
        headers.add("ACCESS-TOKEN", streamerInfo.getChatAccessToken());

        // 쿠키에 JWT 토큰 담기
        cookieProvider.setRefreshToken(response, jwtToken, request.getProvider());

        return new ResponseEntity<>(loginHistoryResDto, headers, HttpStatus.OK);
    }

    @PostMapping("/refresh")
    @Operation(summary = "액세스 토큰 갱신",
            description = "액세스 토큰 만료 시 새로운 액세스 토큰 발급",
            security = {@SecurityRequirement(name = "Basic Auth")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "OK",
                    headers = {@Header(name = "ACCESS_TOKEN", description = "Access Token")})
    })
    public ResponseEntity<LoginHistoryResDto> refreshAccessToken(
        @Valid @RequestBody RefreshTokenReqDto request,
        HttpServletResponse response
    ) {

        // 액세스 토큰 갱신
        RefreshTokenResDto refreshTokenResDto = authService.refreshAccessToken(request.getProvider());

        // 액세스 토큰으로 유저 정보 얻기
        StreamerInfoDto streamerInfo = loginService.getStreamerInfo(refreshTokenResDto.getAccessToken(), request.getProvider());
        LoginHistoryResDto loginHistoryResDto = LoginHistoryResDto.builder()
            .streamerId(streamerInfo.getId())
            .nickname(streamerInfo.getNickname())
            .imgUrl(streamerInfo.getImageUrl())
            .build();

        // 헤더에 액세스 토큰 담기
        HttpHeaders headers = new HttpHeaders();
        headers.add("ACCESS-TOKEN", streamerInfo.getChatAccessToken());

        // 쿠키에 리프레시 토큰 담기
        cookieProvider.setRefreshToken(response, refreshTokenResDto.getJwtRefreshToken(), request.getProvider());

        return new ResponseEntity<>(loginHistoryResDto, headers, HttpStatus.OK);
    }
}
