package com.kibitzbugs.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RefreshTokenResDto {

    private String accessToken;
    private String jwtRefreshToken;

}
