package com.kibitzbugs.controller;

import com.kibitzbugs.dto.login.LoginReqDto;
import com.kibitzbugs.dto.login.LoginResDto;
import com.kibitzbugs.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/login")
@RequiredArgsConstructor
public class LoginController {

    final private LoginService loginService;

    @PostMapping("")
    public ResponseEntity<LoginResDto> createLoginHistory(@RequestBody LoginReqDto loginReqDto) {
        return ResponseEntity.ok(loginService.createLoginHistory(loginReqDto));
    }

}
