package com.kibitzbugs.service;

import com.kibitzbugs.dto.login.LoginCntResDto;
import com.kibitzbugs.dto.login.LoginReqDto;
import com.kibitzbugs.dto.login.LoginResDto;
import com.kibitzbugs.entity.Login;
import com.kibitzbugs.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {

    final private LoginRepository loginRepository;
    final private TelegramService telegramService;

    public LoginResDto createLoginHistory(LoginReqDto loginReqDto) {
        Login savedLogin = loginRepository.save(Login.builder()
                .streamerId(loginReqDto.getId())
                .name(loginReqDto.getName())
                .nickname(loginReqDto.getNickname())
                .imgUrl(loginReqDto.getImgUrl())
                .build()
        );

        telegramService.sendMessage("[로그인] " + savedLogin.getNickname() + "%0A" +
                "https://www.twitch.tv/" + savedLogin.getName());
        log.info("[Login] " + savedLogin.getNickname());

        return LoginResDto.builder()
                .id(savedLogin.getId())
                .name(savedLogin.getName())
                .streamerId(savedLogin.getStreamerId())
                .nickname(savedLogin.getNickname())
                .imgUrl(savedLogin.getImgUrl())
                .build();
    }

    public LoginCntResDto getLoginCnt() {
        return LoginCntResDto.builder()
                .cnt(loginRepository.count())
                .build();
    }

}
