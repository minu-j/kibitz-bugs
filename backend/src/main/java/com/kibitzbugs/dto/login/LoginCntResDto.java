package com.kibitzbugs.dto.login;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginCntResDto {
    @Schema(description = "로그인 횟수", example = "100")
    private Long cnt;
}
