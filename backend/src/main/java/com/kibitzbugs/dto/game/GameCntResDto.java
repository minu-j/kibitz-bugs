package com.kibitzbugs.dto.game;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@ApiModel(value = "게임 횟수 응답")
public class GameCntResDto {
    @ApiModelProperty(value = "게임 횟수", example = "100")
    private Long cnt;
}
