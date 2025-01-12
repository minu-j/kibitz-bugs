package com.kibitzbugs.auth;

import com.kibitzbugs.enums.Provider;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProviderTokenPair {

	private Provider provider;
	private String refreshToken;

	public static ProviderTokenPair from(String authority) {
		for (Provider provider : Provider.values()) {
			if (authority.startsWith(provider.name())) {
				return new ProviderTokenPair(provider, authority.substring((provider + "-").length()));
			}
		}
		return null;
	}

}
