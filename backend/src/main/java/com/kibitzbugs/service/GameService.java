package com.kibitzbugs.service;

import com.kibitzbugs.dto.game.GameCntResDto;
import com.kibitzbugs.dto.game.GameHistoryReqDto;
import com.kibitzbugs.dto.game.GameHistoryResDto;
import com.kibitzbugs.entity.Game;
import com.kibitzbugs.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

    final private GameRepository gameRepository;

    public GameHistoryResDto createGameHistory(GameHistoryReqDto gameHistoryReqDto) {
        Game savedGame = gameRepository.save(Game.builder()
                .streamerId(gameHistoryReqDto.getId())
                .name(gameHistoryReqDto.getName())
                .nickname(gameHistoryReqDto.getNickname())
                .imgUrl(gameHistoryReqDto.getImgUrl())
                .win(gameHistoryReqDto.getWin())
                .build()
        );

        String result = savedGame.getWin() ? "승" : "패";
        log.info("[Game] " + savedGame.getNickname() + " (" + result + ")");

        return GameHistoryResDto.builder()
                .id(savedGame.getId())
                .streamerId(savedGame.getStreamerId())
                .name(savedGame.getName())
                .nickname(savedGame.getNickname())
                .imgUrl(savedGame.getImgUrl())
                .win(savedGame.getWin())
                .build();
    }

    public GameCntResDto getGameCnt() {
        return GameCntResDto.builder()
                .cnt(gameRepository.count())
                .build();
    }



}
