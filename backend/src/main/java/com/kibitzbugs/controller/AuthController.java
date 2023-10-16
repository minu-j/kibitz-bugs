package com.kibitzbugs.controller;

import com.kibitzbugs.auth.JwtTokenProvider;
import com.kibitzbugs.dto.auth.AuthenticateUserReqDto;
import com.kibitzbugs.dto.auth.AuthenticateUserResDto;
import com.kibitzbugs.dto.auth.RefreshTokenResDto;
import com.kibitzbugs.dto.thirdparty.twitch.TwitchUserInfoResDto;
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
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Auth")
public class AuthController {

    private final AuthService authService;
    private final LoginService loginService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/code")
    @Operation(summary = "유저 인증", description = "트위치 로그인 시 code로 유저 인증")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "OK",
                    headers = {@Header(name = "ACCESS_TOKEN", description = "Twitch Access Token"),
                            @Header(name = "Set-Cookie", description = "JWT Refresh Token")}),
            @ApiResponse(responseCode = "401", description = "code가 유효하지 않습니다.")
    })
    // 응답 헤더 ACCESS-TOKEN, 쿠키 REFRESH-TOKEN 추가
    public ResponseEntity<LoginHistoryResDto> authenticateUser(HttpServletResponse response,
                                                   @Valid @RequestBody AuthenticateUserReqDto authenticateUserReqDto) {

        // code로 액세스 토큰 및 리프레시 토큰 얻기
        AuthenticateUserResDto authenticateUserResDto = authService.authenticateUser(authenticateUserReqDto.getCode());

        // 액세스 토큰으로 유저 정보 얻기
        TwitchUserInfoResDto.Data userInfo = loginService.getTwitchUserInfo(authenticateUserResDto.getAccessToken());

        // 로그인 기록 저장 및 알림
        LoginHistoryResDto loginHistoryResDto = loginService.createLoginHistory(LoginHistoryReqDto.builder()
                .id(userInfo.getId())
                .nickname(userInfo.getDisplay_name())
                .name(userInfo.getLogin())
                .imgUrl(userInfo.getProfile_image_url())
                .build(), authenticateUserResDto.getAccessToken());

        // 리프레시 토큰과 유저 아이디로 JWT 생성
        String jwtToken = jwtTokenProvider.createToken(authenticateUserResDto.getRefreshToken(), userInfo.getLogin());
        
        // 헤더에 액세스 토큰 담기
        HttpHeaders headers = new HttpHeaders();
        headers.add("ACCESS-TOKEN", authenticateUserResDto.getAccessToken());

        // 쿠키에 JWT 토큰 담기
        setCookie(response, jwtToken);

        return new ResponseEntity<>(loginHistoryResDto, headers, HttpStatus.OK);
    }

    @PostMapping("/refresh")
    @Operation(summary = "액세스 토큰 갱신",
            description = "액세스 토큰 만료 시 새로운 액세스 토큰 발급",
            security = {@SecurityRequirement(name = "Basic Auth")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "OK",
                    headers = {@Header(name = "ACCESS_TOKEN", description = "Twitch Access Token")})
    })
    public ResponseEntity<LoginHistoryResDto> refreshAccessToken(HttpServletResponse response) {
        
        // 액세스 토큰 갱신
        RefreshTokenResDto refreshTokenResDto = authService.refreshAccessToken();

        // 액세스 토큰으로 유저 정보 얻기
        TwitchUserInfoResDto.Data userInfo = loginService.getTwitchUserInfo(refreshTokenResDto.getAccessToken());
        LoginHistoryResDto loginHistoryResDto = LoginHistoryResDto.builder()
                .streamerId(userInfo.getId())
                .name(userInfo.getLogin())
                .nickname(userInfo.getDisplay_name())
                .imgUrl(userInfo.getProfile_image_url())
                .build();

        // 헤더에 액세스 토큰 담기
        HttpHeaders headers = new HttpHeaders();
        headers.add("ACCESS-TOKEN", refreshTokenResDto.getAccessToken());

        // 쿠키에 리프레시 토큰 담기
        setCookie(response, refreshTokenResDto.getJwtRefreshToken());
        
        return new ResponseEntity<>(loginHistoryResDto, headers, HttpStatus.OK);
    }

    private void setCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from("REFRESH-TOKEN", refreshToken)
                .path("/")
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

}
