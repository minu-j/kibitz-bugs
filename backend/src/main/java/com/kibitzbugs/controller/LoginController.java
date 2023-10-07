package com.kibitzbugs.controller;

import com.kibitzbugs.dto.login.LoginCntResDto;
import com.kibitzbugs.dto.login.LoginReqDto;
import com.kibitzbugs.dto.login.LoginResDto;
import com.kibitzbugs.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/login")
@RequiredArgsConstructor
public class LoginController {

    final private LoginService loginService;

    @PostMapping("")
    public ResponseEntity<LoginResDto> createLoginHistory(@Valid @RequestBody LoginReqDto loginReqDto) {
        return ResponseEntity.ok(loginService.createLoginHistory(loginReqDto));
    }

    @GetMapping("/cnt")
    public ResponseEntity<LoginCntResDto> getLoginCnt() {
        return ResponseEntity.ok(loginService.getLoginCnt());
    }

}
