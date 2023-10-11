package com.kibitzbugs.dto.login;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class LoginHistoryReqDto {
    @NotBlank
    @Schema(description = "스트리머 식별 id", example = "123456789", requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotBlank
    @Schema(description = "스트리머 계정 아이디", example = "ysu6691", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @NotBlank
    @Schema(description = "스트리머 닉네임", example = "훈수남", requiredMode = Schema.RequiredMode.REQUIRED)
    private String nickname;

    @NotBlank
    @Schema(description = "스트리머 이미지", example = "https://imgurl", requiredMode = Schema.RequiredMode.REQUIRED)
    private String imgUrl;
}
