package com.kibitzbugs.controller;

import com.kibitzbugs.dto.game.GameCntResDto;
import com.kibitzbugs.dto.game.GameHistoryReqDto;
import com.kibitzbugs.dto.game.GameHistoryResDto;
import com.kibitzbugs.service.GameService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
@Tag(name = "Game")
public class GameController {

    final private GameService gameService;

    @PostMapping("")
    @Operation(summary = "게임 기록 생성",
            description = "게임을 마치면 자신의 정보 및 승/패 유무를 저장",
            security = {@SecurityRequirement(name = "Basic Auth")}
    )
    public ResponseEntity<GameHistoryResDto> createGameHistory(@Valid @RequestBody GameHistoryReqDto gameHistoryReqDto) {
        return ResponseEntity.ok(gameService.createGameHistory(gameHistoryReqDto));
    }

    @GetMapping("/cnt")
    @Operation(summary = "게임 수 조회",
            description = "현재까지 DB에 저장된 게임 횟수를 중복 없이 조회")
    public ResponseEntity<GameCntResDto> getGameCnt() {
        return ResponseEntity.ok(gameService.getGameCnt());
    }

}
