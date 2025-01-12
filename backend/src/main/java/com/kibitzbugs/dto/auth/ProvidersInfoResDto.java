package com.kibitzbugs.dto.auth;

import com.kibitzbugs.dto.login.StreamerInfoDto;
import com.kibitzbugs.enums.Provider;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProvidersInfoResDto {

	private ProviderInfo twitch;
	private ProviderInfo chzzk;
	private ProviderInfo soop;

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ProviderInfo {
		@Schema(description = "스트리머 식별 id", example = "123456789")
		private String streamerId;

		@Schema(description = "스트리머 이름", example = "ysu6691")
		private String name;

		@Schema(description = "스트리머 닉네임", example = "훈수남")
		private String nickname;

		@Schema(description = "스트리머 이미지", example = "https://imgurl")
		private String imgUrl;

		@Schema(description = "액세스 토큰", example = "ABCDEFG")
		private String accessToken;
	}

	public void updateProviderInfo(StreamerInfoDto streamerInfo, Provider provider) {
		switch (provider) {
			case TWITCH -> {
				this.twitch = new ProviderInfo();
				this.twitch.streamerId = streamerInfo.getId();
				this.twitch.name = streamerInfo.getName();
				this.twitch.nickname = streamerInfo.getNickname();
				this.twitch.imgUrl = streamerInfo.getImageUrl();
				this.twitch.accessToken = streamerInfo.getChatAccessToken();
			}
			case CHZZK -> {
				this.chzzk = new ProviderInfo();
				this.chzzk.streamerId = streamerInfo.getId();
				this.chzzk.nickname = streamerInfo.getNickname();
				this.chzzk.imgUrl = streamerInfo.getImageUrl();
				this.chzzk.accessToken = streamerInfo.getChatAccessToken();
			}
			case SOOP -> {
				this.soop = new ProviderInfo();
				this.soop.streamerId = streamerInfo.getId();
				this.soop.nickname = streamerInfo.getNickname();
				this.soop.imgUrl = streamerInfo.getImageUrl();
				this.soop.accessToken = streamerInfo.getChatAccessToken();
			}
		}
	}

}
