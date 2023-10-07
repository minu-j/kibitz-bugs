package com.kibitzbugs.controller;

import com.kibitzbugs.dto.game.GameCntResDto;
import com.kibitzbugs.dto.game.GameReqDto;
import com.kibitzbugs.dto.game.GameResDto;
import com.kibitzbugs.dto.login.LoginCntResDto;
import com.kibitzbugs.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/game")
@RequiredArgsConstructor
public class GameController {

    final private GameService gameService;

    @PostMapping("")
    public ResponseEntity<GameResDto> createGameHistory(@Valid @RequestBody GameReqDto gameReqDto) {
        return ResponseEntity.ok(gameService.createGameHistory(gameReqDto));
    }

    @GetMapping("/cnt")
    public ResponseEntity<GameCntResDto> getLoginCnt() {
        return ResponseEntity.ok(gameService.getGameCnt());
    }

}
