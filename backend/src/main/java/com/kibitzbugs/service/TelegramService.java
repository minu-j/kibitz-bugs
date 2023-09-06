package com.kibitzbugs.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class TelegramService {

    @Value("#{telegram['telegram.token']}")
    private String token;

    @Value("#{telegram['telegram.chat-id']}")
    private String chatId;

    public void sendMessage(String text){
        try {
            URL url = new URL("https://api.telegram.org/bot" + token + "/sendmessage?chat_id=" + chatId + "&text=" + text);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.getInputStream();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}
