package com.kibitzbugs.dto.auth;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "유저 인증 요청")
public class AuthenticateUserReqDto {

    @NotBlank
    @ApiModelProperty(value = "Authorization Code", example = "gulfwdmys5lsm6qyz4xiz9q32l10", required = true)
    private String code;

}
