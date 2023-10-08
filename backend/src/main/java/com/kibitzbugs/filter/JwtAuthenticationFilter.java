package com.kibitzbugs.filter;

import com.kibitzbugs.auth.JwtTokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwtToken = jwtTokenProvider.resolveToken(request);
            if (jwtToken != null && jwtTokenProvider.validateToken(jwtToken)) {
                Authentication authentication = jwtTokenProvider.getAuthentication(jwtToken);
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
