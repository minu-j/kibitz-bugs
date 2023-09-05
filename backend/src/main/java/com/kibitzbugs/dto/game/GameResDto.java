package com.kibitzbugs.dto.game;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GameResDto {
    private Long id;
    private String streamerId;
    private String nickname;
    private String imgUrl;
    private Boolean win;
}
