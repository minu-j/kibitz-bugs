package com.kibitzbugs.controller;

import com.kibitzbugs.dto.auth.AuthenticateUserReqDto;
import com.kibitzbugs.dto.auth.AuthenticateUserResDto;
import com.kibitzbugs.service.AuthService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Api(tags = "Auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/code")
    @ApiOperation(value = "유저 인증", notes = "트위치 로그인 시 code로 유저 인증")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseHeaders = {
                    @io.swagger.annotations.ResponseHeader(
                            name = "ACCESS-TOKEN",
                            description = "Access Token",
                            response = String.class),
            }),
            @ApiResponse(code = 401, message = "code가 유효하지 않습니다.")
    })
    @ApiImplicitParam(
            name = "REFRESH-TOKEN",
            value = "Refresh Token",
            dataTypeClass = String.class,
            paramType = "cookie"
    )
    public ResponseEntity<Object> authenticateUser(HttpServletResponse response,
                                                   @Valid @RequestBody AuthenticateUserReqDto authenticateUserReqDto) {
        AuthenticateUserResDto authenticateUserResDto = authService.authenticateUser(authenticateUserReqDto.getCode());
        
        // 헤더에 액세스 토큰 담기
        HttpHeaders headers = new HttpHeaders();
        headers.add("ACCESS-TOKEN", authenticateUserResDto.getAccessToken());

        // 쿠키에 리프레시 JWT 토큰 담기
        setCookie(response, authenticateUserResDto.getJwtRefreshToken());
        
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }

    @PostMapping("/refresh")
    @ApiOperation(value = "액세스 토큰 갱신", notes = "액세스 토큰 만료 시 새로운 액세스 토큰 발급")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseHeaders = {
                    @io.swagger.annotations.ResponseHeader(
                            name = "ACCESS-TOKEN",
                            description = "Access Token",
                            response = String.class),
            }),
            @ApiResponse(code = 401, message = "유저 인증에 실패하였습니다.")
    })
    public ResponseEntity<Object> refreshAccessToken(Principal principal) {

        System.out.println(principal);
        
        // 액세스 토큰 갱신
        String accessToken = authService.refreshAccessToken(principal);

        // 헤더에 액세스 토큰 담기
        HttpHeaders headers = new HttpHeaders();
        headers.add("ACCESS-TOKEN", accessToken);
        
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
