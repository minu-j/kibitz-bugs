package com.kibitzbugs.service;

import com.kibitzbugs.dto.game.GameReqDto;
import com.kibitzbugs.dto.game.GameResDto;
import com.kibitzbugs.entity.Game;
import com.kibitzbugs.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

        String result = savedGame.getWin() ? "승" : "패";

        List<Game> games = gameRepository.findGamesByStreamerId(savedGame.getStreamerId());
        int winCnt = 0;
        int loseCnt = 0;
        for (Game game : games) {
            if (game.getWin()) {
                winCnt++;
            } else {
                loseCnt++;
            }
        }

        telegramService.sendMessage("[게임종료] " + savedGame.getNickname() + " (" + result + ")%0A"
                                        + "현재 전적: " + winCnt + "승 " + loseCnt + "패");

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
