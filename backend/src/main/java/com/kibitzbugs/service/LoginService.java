package com.kibitzbugs.service;

import com.kibitzbugs.dto.login.LoginCntResDto;
import com.kibitzbugs.dto.login.LoginHistoryReqDto;
import com.kibitzbugs.dto.login.LoginHistoryResDto;
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

    public LoginHistoryResDto createLoginHistory(LoginHistoryReqDto loginHistoryReqDto) {
        Login savedLogin = loginRepository.save(Login.builder()
                .streamerId(loginHistoryReqDto.getId())
                .name(loginHistoryReqDto.getName())
                .nickname(loginHistoryReqDto.getNickname())
                .imgUrl(loginHistoryReqDto.getImgUrl())
                .build()
        );

        telegramService.sendMessage("[로그인] " + savedLogin.getNickname() + "%0A" +
                "https://www.twitch.tv/" + savedLogin.getName());
        log.info("[Login] " + savedLogin.getNickname());

        return LoginHistoryResDto.builder()
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
