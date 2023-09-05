package com.kibitzbugs.service;

import com.kibitzbugs.dto.login.LoginReqDto;
import com.kibitzbugs.dto.login.LoginResDto;
import com.kibitzbugs.entity.Login;
import com.kibitzbugs.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    final private LoginRepository loginRepository;

    public LoginResDto createLoginHistory(LoginReqDto loginReqDto) {
        Login savedLogin = loginRepository.save(Login.builder()
                .streamerId(loginReqDto.getId())
                .nickname(loginReqDto.getNickname())
                .imgUrl(loginReqDto.getImgUrl())
                .build()
        );
        return LoginResDto.builder()
                .id(savedLogin.getId())
                .streamerId(savedLogin.getStreamerId())
                .nickname(savedLogin.getNickname())
                .imgUrl(savedLogin.getImgUrl())
                .build();
    }

}
