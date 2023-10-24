package com.kibitzbugs.dto.game;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GameCntResDto {
    @Schema(description = "게임 횟수", example = "100")
    private Long cnt;
}
