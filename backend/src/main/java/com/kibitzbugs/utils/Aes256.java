package com.kibitzbugs.utils;


import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.InvalidAlgorithmParameterException;

@Component
public class Aes256 {
    @Value("#{private['jwt.secret']}")
    private String secret;
    private String secretKey;
    private String IV;

    @PostConstruct
    protected void init() {
        secretKey = secret.substring(0, 32);
        IV = secret.substring(0, 16);
    }

    // 암호화
    public String encode(String str) {
        try {
            byte[] keyData = secretKey.getBytes();

            SecretKey secureKey = new SecretKeySpec(keyData, "AES");

            Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
            c.init(Cipher.ENCRYPT_MODE, secureKey, new IvParameterSpec(IV.getBytes()));

            byte[] encrypted = c.doFinal(str.getBytes(StandardCharsets.UTF_8));
            return new String(Base64.encodeBase64(encrypted));
        } catch (NoSuchAlgorithmException | NoSuchPaddingException |
                 InvalidKeyException | InvalidAlgorithmParameterException | IllegalBlockSizeException |
                 BadPaddingException e) {
            throw new RuntimeException(e);
        }
    }

    // 복호화
    public String decode(String str) {

        try {
            byte[] keyData = secretKey.getBytes();
            SecretKey secureKey = new SecretKeySpec(keyData, "AES");
            Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
            c.init(Cipher.DECRYPT_MODE, secureKey, new IvParameterSpec(IV.getBytes(StandardCharsets.UTF_8)));

            byte[] byteStr = Base64.decodeBase64(str.getBytes());

            return new String(c.doFinal(byteStr), "UTF-8");
        } catch (UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException |
                 InvalidKeyException | InvalidAlgorithmParameterException | IllegalBlockSizeException |
                 BadPaddingException e) {
            throw new RuntimeException(e);
        }
    }
}