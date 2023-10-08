package com.kibitzbugs.auth;

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
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("#{jwt['jwt.secret']}")
    private String secret;

    @Value("#{jwt['jwt.validity.in.seconds']}")
    private Integer tokenValidityInSeconds;

    private Key key;

    @PostConstruct
    protected void init() {
        key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    public String createToken(String refreshToken) {
        Claims claims = Jwts.claims().setSubject(refreshToken);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date((now.getTime() + tokenValidityInSeconds)))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("JWT-TOKEN");
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public String getRefreshToken(String jwtToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken).getBody().getSubject();
        } catch (Exception e) {
            throw new AuthenticationServiceException("토큰이 유효하지 않습니다.");
        }
    }

    public Authentication getAuthentication(String jwtToken) {
        Collection<? extends GrantedAuthority> authorities = new ArrayList<>();
        UserDetails userDetails = new User(getRefreshToken(jwtToken), "", authorities);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

}
