package com.kibitzbugs.dto.thirdparty.naver;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class NaverChatAccessTokenResDto {

	private Content content;

	@Getter
	@ToString
	public static class Content {
		private String accessToken;
	}

}
