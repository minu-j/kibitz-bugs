package com.kibitzbugs.dto.login;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginResDto {
    private Long id;
    private String streamerId;
    private String nickname;
    private String imgUrl;
}
