package com.kibitzbugs.dto.login;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginHistoryResDto {

    @Schema(description = "스트리머 식별 id", example = "123456789")
    private String streamerId;

    @Schema(description = "스트리머 계정 아이디", example = "ysu6691")
    private String name;

    @Schema(description = "스트리머 닉네임", example = "훈수남")
    private String nickname;

    @Schema(description = "스트리머 이미지", example = "https://imgurl")
    private String imgUrl;
}
