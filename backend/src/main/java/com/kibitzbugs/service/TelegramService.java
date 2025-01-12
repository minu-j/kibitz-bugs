package com.kibitzbugs.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import com.kibitzbugs.dto.webhook.WebhookReqDto;

@Service
@Slf4j
public class TelegramService {

    @Value("#{private['telegram.token']}")
    private String token;

    @Value("#{private['telegram.chat-id']}")
    private String chatId;

    // 유저 로그인 시 알림
    public void sendMessage(String text){
        WebhookReqDto reqDto = WebhookReqDto.builder()
            .chatId(chatId)
            .text(text)
            .build();

        URI uri = UriComponentsBuilder
            .fromUriString("https://api.telegram.org")
            .path("/bot" + token + "/sendmessage")
            .encode()
            .build()
            .toUri();

        RestTemplate restTemplate = new RestTemplate();
        try {
            restTemplate.postForEntity(uri, reqDto, Object.class);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

}
