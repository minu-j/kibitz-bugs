package com.kibitzbugs.dto.login;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StreamerInfoDto {

	private String id;
	private String nickname;
	private String imageUrl;
	private String broadcastUrlId;
	private String chatAccessToken;

}
