package com.kibitzbugs.dto.thirdparty.naver;

import com.kibitzbugs.dto.thirdparty.CommonTokenResDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class NaverRefreshTokenResDto {

	private String code;
	private String message;
	private Content content;

	@Getter
	public static class Content {
		private String accessToken;
		private String refreshToken;
		private String scope;
		private String tokenType; // Bearer
		private String expiresIn;
	}

	public CommonTokenResDto toCommonDto() {
		return CommonTokenResDto.builder()
			.accessToken(content.getAccessToken())
			.refreshToken(content.getRefreshToken())
			.build();
	}


}
