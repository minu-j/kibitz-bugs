package com.kibitzbugs.dto.thirdparty.soop;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.kibitzbugs.dto.login.StreamerInfoDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SoopChanneInfoResDto {

	private Data data;

	@Getter
	@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class Data {
		private String userNick;
		private String stationName;
		private String profileImage;
		private String favoriteCnt;

		public StreamerInfoDto toStreamerInfo(String accessToken) {
			return StreamerInfoDto.builder()
				.id(stationName)
				.nickname(userNick)
				.imageUrl(profileImage)
				.broadcastUrlId(userNick)
				.chatAccessToken(accessToken)
				.build();
		}
	}

}
