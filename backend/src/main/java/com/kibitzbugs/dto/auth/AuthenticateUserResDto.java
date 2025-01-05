package com.kibitzbugs.dto.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class AuthenticateUserResDto {

    private String accessToken;
    private String refreshToken;

}
