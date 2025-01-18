package com.kibitzbugs.service;

import com.kibitzbugs.dto.game.GameCntResDto;
import com.kibitzbugs.dto.game.GameHistoryReqDto;
import com.kibitzbugs.dto.game.GameHistoryResDto;
import com.kibitzbugs.entity.Game;
import com.kibitzbugs.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

    final private GameRepository gameRepository;

    // 게임 기록 생성
    @Transactional
    public GameHistoryResDto createGameHistory(GameHistoryReqDto gameHistoryReqDto) {
        Game savedGame = gameRepository.save(Game.builder()
                .streamerId(gameHistoryReqDto.getId())
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

    // 총 게임 카운트 조회
    public GameCntResDto getGameCnt() {
        Optional<Game> optionalGame = gameRepository.findFirstByOrderByIdDesc();
        return GameCntResDto.builder()
                .cnt(optionalGame.isPresent() ? optionalGame.get().getId() : 0)
                .build();
    }



}
