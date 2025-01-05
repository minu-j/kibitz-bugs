package com.kibitzbugs.dto.thirdparty.naver;

import java.util.List;

import com.kibitzbugs.dto.login.StreamerInfoDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class NaverChannelInfoResDto {

	private String code;
	private String message;
	private Content content;

	@Getter
	public static class Content {
		private List<Data> data;

		@Getter
		public static class Data {
			private String channelId;
			private String channelName;
			private String channelImageUrl;
			private Integer followerCount;

			public StreamerInfoDto toStreamerInfo(String chatAccessToken) {
				return StreamerInfoDto.builder()
					.id(channelId)
					.nickname(channelName)
					.imageUrl(channelImageUrl)
					.broadcastUrlId(channelId)
					.chatAccessToken(chatAccessToken)
					.build();
			}
		}
	}

}
