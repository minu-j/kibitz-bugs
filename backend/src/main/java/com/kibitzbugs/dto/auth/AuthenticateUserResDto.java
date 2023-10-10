package com.kibitzbugs.dto.auth;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AuthenticateUserResDto {

    private String accessToken;
    private String jwtRefreshToken;

}
