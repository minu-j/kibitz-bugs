package com.kibitzbugs.controller;

import com.kibitzbugs.dto.game.GameReqDto;
import com.kibitzbugs.dto.game.GameResDto;
import com.kibitzbugs.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
