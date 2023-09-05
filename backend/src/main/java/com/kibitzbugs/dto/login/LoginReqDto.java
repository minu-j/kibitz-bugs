package com.kibitzbugs.dto.login;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginReqDto {
    private String id;
    private String nickname;
    private String imgUrl;
}
