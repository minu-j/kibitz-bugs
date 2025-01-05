package com.kibitzbugs.auth;

import com.kibitzbugs.enums.Provider;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProviderTokenPair {

	private Provider provider;
	private String token;

}
