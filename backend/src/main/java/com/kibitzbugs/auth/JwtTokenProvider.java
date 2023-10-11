package com.kibitzbugs.auth;

import com.kibitzbugs.utils.Aes256;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.*;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final Aes256 aes256;

    @Value("#{private['jwt.secret']}")
    private String secret;

    @Value("#{private['jwt.validity.in.seconds']}")
    private Integer tokenValidityInSeconds;

    private Key key;

    @PostConstruct
    protected void init() {
        key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    // 리프레시 토큰으로 JWT토큰 생성
    // twitch 로그인 Id 확인 후 admin 권한 부여
    public String createToken(String refreshToken, String twitchId) {
        Claims claims = Jwts.claims();
        Date now = new Date();

        // 권한 분기
        String role = Role.user();
        if(twitchId.equals("dbstjddns777") || twitchId.equals("min__u")) {
            role = Role.admin();
        }

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(encodeRefreshToken(refreshToken))
                .setIssuedAt(now)
                .setAudience(role)
                .setExpiration(new Date((now.getTime() + tokenValidityInSeconds)))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 리프레시 토큰으로 JWT토큰 생성
    // 토큰의 권환 그대로 권한 부여
    public String createToken(String refreshToken, Collection<? extends GrantedAuthority> authorities) {
        Claims claims = Jwts.claims();
        Date now = new Date();

        // 권한 분기
        String role = Role.user();
        for(GrantedAuthority authority : authorities) {
            if(authority.getAuthority().equals("admin")) {
                role = Role.admin();
            }
        }

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(encodeRefreshToken(refreshToken))
                .setAudience(role)
                .setIssuedAt(now)
                .setExpiration(new Date((now.getTime() + tokenValidityInSeconds)))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 요청의 쿠키에서 JWT 토큰 확인 후 JWT 토큰 반환
    public String resolveToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies) {
            if(cookie.getName().equals("REFRESH-TOKEN")) {
                return cookie.getValue();
            }
        }
        throw new AuthenticationServiceException("REFRESH-TOKEN이 없습니다.");
    }

    // JWT토큰 유효성 검증
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    // JWT토큰으로 리프레시 토큰 얻기
    public String getRefreshToken(String jwtToken) {
        try {
            return decodeJwtSubject(Jwts.parserBuilder().setSigningKey(key).build()
                    .parseClaimsJws(jwtToken).getBody().getSubject());
        } catch (Exception e) {
            throw new AuthenticationServiceException("토큰이 유효하지 않습니다.");
        }
    }

    // 유저 인증 후 인증 객체 반환
    public Authentication getAuthentication(String jwtToken) {
        Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken);
        Set<GrantedAuthority> authorities = new HashSet<>();
        GrantedAuthority authority = new SimpleGrantedAuthority(claims.getBody().getAudience());
        authorities.add(authority);
        UserDetails userDetails = new User(getRefreshToken(jwtToken), "", authorities);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    private String encodeRefreshToken(String refreshToken) {
        return aes256.encode(refreshToken);
    }

    private String decodeJwtSubject(String subject) {
        return aes256.decode(subject);
    }

}
