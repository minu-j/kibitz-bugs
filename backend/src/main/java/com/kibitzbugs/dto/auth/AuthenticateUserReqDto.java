package com.kibitzbugs.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.kibitzbugs.enums.Provider;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticateUserReqDto {

    @NotBlank
    @Schema(description = "Authorization Code", example = "gulfwdmys5lsm6qyz4xiz9q32l10", requiredMode = Schema.RequiredMode.REQUIRED)
    private String code;

    @NotNull
    @Schema(description = "방송 종류", example = "twitch", requiredMode = Schema.RequiredMode.REQUIRED)
    private Provider provider;

    @Schema(description = "인증 코드 요청시 발급 받은 state", example = "zxclDasdfA25", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String state;

}
