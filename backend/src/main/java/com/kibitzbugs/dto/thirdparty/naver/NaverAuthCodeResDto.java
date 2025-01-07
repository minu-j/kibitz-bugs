package com.kibitzbugs.dto.thirdparty.naver;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class NaverAuthCodeResDto {
	private String code;
	private String message;
	private Content content;

	@Getter
	public static class Content {
		private String accessToken;
		private String refreshToken;
		private String tokenType; // Bearer
		private String expiresIn;
	}

}
