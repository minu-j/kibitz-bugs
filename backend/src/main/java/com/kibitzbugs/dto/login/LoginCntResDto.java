package com.kibitzbugs.dto.login;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@ApiModel(value = "로그인 횟수 응답")
public class LoginCntResDto {
    @ApiModelProperty(value = "로그인 횟수", example = "100")
    private Long cnt;
}
