package com.kibitzbugs.controller;

import com.kibitzbugs.dto.auth.AuthenticateUserReqDto;
import com.kibitzbugs.dto.auth.AuthenticateUserResDto;
import com.kibitzbugs.dto.auth.RefreshTokenResDto;
import com.kibitzbugs.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Schema;
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
import java.util.Arrays;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Auth")
public class AuthController {

    private final AuthService authService;

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
    public ResponseEntity<Object> authenticateUser(HttpServletResponse response,
                                                   @Valid @RequestBody AuthenticateUserReqDto authenticateUserReqDto) {

        // code로 액세스 토큰 및 JWT 리프레시 토큰 얻기
        AuthenticateUserResDto authenticateUserResDto = authService.authenticateUser(authenticateUserReqDto.getCode());
        
        // 헤더에 액세스 토큰 담기
        HttpHeaders headers = new HttpHeaders();
        headers.add("ACCESS-TOKEN", authenticateUserResDto.getAccessToken());

        // 쿠키에 리프레시 JWT 토큰 담기
        setCookie(response, authenticateUserResDto.getJwtRefreshToken());
        
        return new ResponseEntity<>(headers, HttpStatus.OK);
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
    public ResponseEntity<Object> refreshAccessToken(HttpServletResponse response) {
        
        // 액세스 토큰 갱신
        RefreshTokenResDto refreshTokenResDto = authService.refreshAccessToken();

        // 헤더에 액세스 토큰 담기
        HttpHeaders headers = new HttpHeaders();
        headers.add("ACCESS-TOKEN", refreshTokenResDto.getAccessToken());

        setCookie(response, refreshTokenResDto.getJwtRefreshToken());
        
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }


    private void setCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from("REFRESH-TOKEN", refreshToken)
                .path("/")
                .sameSite("Strict")
                .httpOnly(true)
                .secure(true)
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

}
