package com.kibitzbugs.controller;

import com.kibitzbugs.dto.login.LoginCntResDto;
import com.kibitzbugs.dto.login.LoginHistoryReqDto;
import com.kibitzbugs.dto.login.LoginHistoryResDto;
import com.kibitzbugs.service.LoginService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/login")
@RequiredArgsConstructor
@Api(tags = "Login")
public class LoginController {

    final private LoginService loginService;

    @PostMapping("")
    @ApiOperation(value = "로그인 기록 생성", notes = "트위치 로그인 시 자신의 정보를 저장")
    @ApiResponse(code = 401, message = "유저 인증에 실패하였습니다.")
    public ResponseEntity<LoginHistoryResDto> createLoginHistory(@Valid @RequestBody LoginHistoryReqDto loginHistoryReqDto) {
        return ResponseEntity.ok(loginService.createLoginHistory(loginHistoryReqDto));
    }

    @GetMapping("/cnt")
    @ApiOperation(value = "로그인 수 조회", notes = "현재까지 DB에 저장된 로그인 횟수를 중복 없이 조회")
    @ApiResponse(code = 401, message = "유저 인증에 실패하였습니다.")
    public ResponseEntity<LoginCntResDto> getLoginCnt() {
        return ResponseEntity.ok(loginService.getLoginCnt());
    }

}
