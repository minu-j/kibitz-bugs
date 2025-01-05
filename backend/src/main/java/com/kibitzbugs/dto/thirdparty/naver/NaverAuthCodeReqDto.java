package com.kibitzbugs.dto.thirdparty.naver;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NaverAuthCodeReqDto {
	private String grantType;
	private String clientId;
	private String clientSecret;
	private String code;
	private String state;
}
