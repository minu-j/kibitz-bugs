package com.kibitzbugs.dto.thirdparty.soop;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class SoopRefreshTokenReqDto {

	private String grantType;
	private String clientId;
	private String clientSecret;
	private String redirectUri;
	private String refreshToken;

}

