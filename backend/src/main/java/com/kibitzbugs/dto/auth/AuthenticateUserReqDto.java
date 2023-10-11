package com.kibitzbugs.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticateUserReqDto {

    @NotBlank
    @Schema(description = "Authorization Code", example = "gulfwdmys5lsm6qyz4xiz9q32l10", requiredMode = Schema.RequiredMode.REQUIRED)
    private String code;

}
