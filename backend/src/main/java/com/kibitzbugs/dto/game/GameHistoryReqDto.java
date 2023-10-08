package com.kibitzbugs.dto.game;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
@ApiModel(value = "게임 기록 요청")
public class GameHistoryReqDto {
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


    @NotNull
    @ApiModelProperty(value = "승/패", example = "true", required = true)
    private Boolean win;
}
