package com.kibitzbugs.service;

import com.kibitzbugs.dto.game.GameReqDto;
import com.kibitzbugs.dto.game.GameResDto;
import com.kibitzbugs.entity.Game;
import com.kibitzbugs.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

    final private GameRepository gameRepository;

    public GameResDto createGameHistory(GameReqDto gameReqDto) {
        Game savedGame = gameRepository.save(Game.builder()
                .streamerId(gameReqDto.getId())
                .name(gameReqDto.getName())
                .nickname(gameReqDto.getNickname())
                .imgUrl(gameReqDto.getImgUrl())
                .win(gameReqDto.getWin())
                .build()
        );

        String result = savedGame.getWin() ? "승" : "패";
        log.info("[Game] " + savedGame.getNickname() + " (" + result + ")");

        return GameResDto.builder()
                .id(savedGame.getId())
                .streamerId(savedGame.getStreamerId())
                .name(savedGame.getName())
                .nickname(savedGame.getNickname())
                .imgUrl(savedGame.getImgUrl())
                .win(savedGame.getWin())
                .build();
    }

}
