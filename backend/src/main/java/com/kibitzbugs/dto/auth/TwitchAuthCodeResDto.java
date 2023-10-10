package com.kibitzbugs.dto.auth;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class TwitchAuthCodeResDto {

    private String access_token;
    private String refresh_token;
    private Long expires_in;
    private String[] scope;
    private String token_type;

}
