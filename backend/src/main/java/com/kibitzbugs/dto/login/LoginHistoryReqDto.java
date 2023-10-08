package com.kibitzbugs.dto.login;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@ApiModel(value = "로그인 기록 요청")
public class LoginHistoryReqDto {
    @NotBlank
    @ApiModelProperty(value = "스트리머 식별 id", example = "123456789", required = true)
    private String id;

    @NotBlank
    @ApiModelProperty(value = "스트리머 계정 아이디", example = "ysu6691", required = true)
    private String name;

    @NotBlank
    @ApiModelProperty(value = "스트리머 닉네임", example = "훈수남", required = true)
    private String nickname;

    @NotBlank
    @ApiModelProperty(value = "스트리머 이미지", example = "https://imgurl", required = true)
    private String imgUrl;
}
