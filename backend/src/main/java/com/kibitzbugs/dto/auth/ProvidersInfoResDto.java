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

	private ProviderInfo TWITCH;
	private ProviderInfo CHZZK;

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ProviderInfo {
		@Schema(description = "스트리머 식별 id", example = "123456789")
		private String streamerId;

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
				this.TWITCH = new ProviderInfo();
				this.TWITCH.streamerId = streamerInfo.getId();
				this.TWITCH.nickname = streamerInfo.getNickname();
				this.TWITCH.imgUrl = streamerInfo.getImageUrl();
				this.TWITCH.accessToken = streamerInfo.getChatAccessToken();
			}
			case CHZZK -> {
				this.CHZZK = new ProviderInfo();
				this.CHZZK.streamerId = streamerInfo.getId();
				this.CHZZK.nickname = streamerInfo.getNickname();
				this.CHZZK.imgUrl = streamerInfo.getImageUrl();
				this.CHZZK.accessToken = streamerInfo.getChatAccessToken();
			}
		}
	}

}
