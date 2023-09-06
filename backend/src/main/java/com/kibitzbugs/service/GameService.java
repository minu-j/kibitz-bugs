package com.kibitzbugs.service;

import com.kibitzbugs.dto.game.GameReqDto;
import com.kibitzbugs.dto.game.GameResDto;
import com.kibitzbugs.entity.Game;
import com.kibitzbugs.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameService {

    final private GameRepository gameRepository;
    final private TelegramService telegramService;

    public GameResDto createGameHistory(GameReqDto gameReqDto) {
        Game savedGame = gameRepository.save(Game.builder()
                .streamerId(gameReqDto.getId())
                .name(gameReqDto.getName())
                .nickname(gameReqDto.getNickname())
                .imgUrl(gameReqDto.getImgUrl())
                .win(gameReqDto.getWin())
                .build()
        );

        telegramService.sendMessage("스트리머 " + savedGame.getNickname() + "이/가 게임을 완료했습니다.%0A" +
                "https://www.twitch.tv/" + savedGame.getName());

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
