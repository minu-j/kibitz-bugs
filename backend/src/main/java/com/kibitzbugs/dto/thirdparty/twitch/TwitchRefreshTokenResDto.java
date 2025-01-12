package com.kibitzbugs.dto.thirdparty.twitch;

import com.kibitzbugs.dto.thirdparty.CommonTokenResDto;

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

    public CommonTokenResDto toCommonDto() {
        return CommonTokenResDto.builder()
            .accessToken(access_token)
            .refreshToken(refresh_token)
            .build();
    }

}
