package com.kibitzbugs.dto.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GameReqDto {
    private String id;
    private String nickname;
    private String imgUrl;
    private Boolean win;
}
