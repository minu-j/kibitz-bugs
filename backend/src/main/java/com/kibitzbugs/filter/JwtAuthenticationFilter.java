package com.kibitzbugs.filter;

import com.kibitzbugs.auth.JwtTokenProvider;
import com.kibitzbugs.auth.ProviderTokenPair;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            List<ProviderTokenPair> providerTokenPairs = jwtTokenProvider.resolveToken(request);
            if (providerTokenPairs.isEmpty()) {
                SecurityContextHolder.getContext().setAuthentication(null);
            } else {
                Authentication authentication = jwtTokenProvider.getAuthentication(providerTokenPairs);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (ExpiredJwtException e) {
            throw new AuthenticationServiceException("토큰이 만료되었습니다.");
        } catch (JwtException e) {
            throw new AuthenticationServiceException("토큰 인증에 실패하였습니다.");
        }

        filterChain.doFilter(request, response);
    }

}
