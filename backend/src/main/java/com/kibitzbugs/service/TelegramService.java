package com.kibitzbugs.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.HttpURLConnection;
import java.net.URL;

@Service
@Slf4j
public class TelegramService {

    @Value("#{private['telegram.token']}")
    private String token;

    @Value("#{private['telegram.chat-id']}")
    private String chatId;

    // 유저 로그인 시 알림
    public void sendMessage(String text){
        try {
            URL url = new URL("https://api.telegram.org/bot" + token + "/sendmessage?chat_id=" + chatId + "&text=" + text);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.getInputStream();
        } catch(Exception e) {
            log.error(e.getMessage());
        }
    }

}
