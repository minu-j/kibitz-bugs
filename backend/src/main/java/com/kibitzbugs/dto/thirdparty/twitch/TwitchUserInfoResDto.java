package com.kibitzbugs.dto.thirdparty.twitch;

import com.kibitzbugs.dto.login.StreamerInfoDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class TwitchUserInfoResDto {

    @Getter
    public static class Data {
        private String id;
        private String login;
        private String display_name;
        private String type;
        private String broadcaster_type;
        private String description;
        private String profile_image_url;
        private String offline_image_url;
        private String view_count;
        private String email;
        private String created_at;

        public StreamerInfoDto toStreamerInfo(String accessToken) {
            return StreamerInfoDto.builder()
                .id(id)
                .nickname(display_name)
                .imageUrl(profile_image_url)
                .broadcastUrlId(login)
                .chatAccessToken(accessToken)
                .build();
        }
    }
    private Data[] data;
}
