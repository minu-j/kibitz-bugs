package com.kibitzbugs.dto.thirdparty.naver;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NaverRefreshTokenReqDto {

	private String clientId;
	private String clientSecret;
	private String grantType;
	private String refreshToken;

}
