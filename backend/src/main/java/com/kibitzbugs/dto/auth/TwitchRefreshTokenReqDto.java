package com.kibitzbugs.dto.auth;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TwitchRefreshTokenReqDto {

    private String client_id;
    private String client_secret;
    private String grant_type;
    private String refresh_token;

}
