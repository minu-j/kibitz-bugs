package com.kibitzbugs.dto.login;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class StreamerInfoDto {

	private String id;
	private String name;
	private String nickname;
	private String imageUrl;
	private String broadcastUrlId;
	private String chatChannelId;
	private String chatAccessToken;

}
