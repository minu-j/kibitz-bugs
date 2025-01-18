package com.kibitzbugs.dto.auth;

import javax.validation.constraints.NotNull;

import com.kibitzbugs.enums.Provider;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LogoutReqDto {

	@NotNull
	@Schema(description = "방송 종류", example = "twitch", requiredMode = Schema.RequiredMode.REQUIRED)
	private Provider provider;

}
