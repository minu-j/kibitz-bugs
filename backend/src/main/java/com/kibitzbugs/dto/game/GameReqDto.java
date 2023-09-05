package com.kibitzbugs.dto.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class GameReqDto {
    @NotBlank
    private String id;
    @NotBlank
    private String name;
    @NotBlank
    private String nickname;
    @NotBlank
    private String imgUrl;
    @NotNull
    private Boolean win;
}
