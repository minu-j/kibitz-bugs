package com.kibitzbugs.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class TwitchRefreshTokenResDto {

    private String access_token;
    private String refresh_token;
    private String[] scope;
    private String token_type;

}
