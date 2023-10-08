package com.kibitzbugs.controller;

import com.kibitzbugs.dto.game.GameCntResDto;
import com.kibitzbugs.dto.game.GameHistoryReqDto;
import com.kibitzbugs.dto.game.GameHistoryResDto;
import com.kibitzbugs.service.GameService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/game")
@RequiredArgsConstructor
@Api(tags = "Game")
public class GameController {

    final private GameService gameService;

    @PostMapping("")
    @ApiOperation(value = "게임 기록 생성", notes = "게임을 마치면 자신의 정보 및 승/패 유무를 저장")
    public ResponseEntity<GameHistoryResDto> createGameHistory(@Valid @RequestBody GameHistoryReqDto gameHistoryReqDto) {
        return ResponseEntity.ok(gameService.createGameHistory(gameHistoryReqDto));
    }

    @GetMapping("/cnt")
    @ApiOperation(value = "게임 수 조회", notes = "현재까지 DB에 저장된 게임 횟수를 중복 없이 조회")
    public ResponseEntity<GameCntResDto> getGameCnt() {
        return ResponseEntity.ok(gameService.getGameCnt());
    }

}
