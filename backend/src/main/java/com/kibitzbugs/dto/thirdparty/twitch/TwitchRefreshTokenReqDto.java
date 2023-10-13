package com.kibitzbugs.dto.thirdparty.twitch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class TwitchRefreshTokenReqDto {

    private String client_id;
    private String client_secret;
    private String grant_type;
    private String refresh_token;

}
