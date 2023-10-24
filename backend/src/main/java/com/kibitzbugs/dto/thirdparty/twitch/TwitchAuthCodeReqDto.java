package com.kibitzbugs.dto.thirdparty.twitch;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
public class TwitchAuthCodeReqDto {
    private String client_id;
    private String client_secret;
    private String grant_type;
    private String code;
    private String redirect_uri;
}
