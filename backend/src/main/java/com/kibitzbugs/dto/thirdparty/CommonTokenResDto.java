package com.kibitzbugs.dto.thirdparty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommonTokenResDto {

	private String accessToken;
	private String refreshToken;

}
