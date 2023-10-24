package com.kibitzbugs.controller;

import com.kibitzbugs.dto.login.LoginCntResDto;
import com.kibitzbugs.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
@Tag(name = "Login")
public class LoginController {

    final private LoginService loginService;

//    @PostMapping("")
//    @Operation(summary = "로그인 기록 생성",
//            description = "트위치 로그인 시 자신의 정보를 저장",
//            security = {@SecurityRequirement(name = "Basic Auth")})
//    public ResponseEntity<LoginHistoryResDto> createLoginHistory(@Valid @RequestBody LoginHistoryReqDto loginHistoryReqDto) {
//        return ResponseEntity.ok(loginService.createLoginHistory(loginHistoryReqDto));
//    }

    @GetMapping("/cnt")
    @Operation(summary = "로그인 수 조회",
            description = "현재까지 DB에 저장된 로그인 횟수를 중복 없이 조회")
    public ResponseEntity<LoginCntResDto> getLoginCnt() {
        return ResponseEntity.ok(loginService.getLoginCnt());
    }

}
