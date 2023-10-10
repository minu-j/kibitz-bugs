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
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            // 쿠키에 리프레시 토큰이 있는 경우
            Cookie[] cookies = request.getCookies();
            boolean flag = false;
            if (cookies != null) {
                for(Cookie cookie : cookies) {
                    if(cookie.getName().equals("REFRESH-TOKEN")) {
                        flag = true;
                        String jwtToken = jwtTokenProvider.resolveToken(request);
                        if (jwtToken != null && jwtTokenProvider.validateToken(jwtToken)) {
                            Authentication authentication = jwtTokenProvider.getAuthentication(jwtToken);
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                        }
                        break;
                    }
                }
            }

            // 쿠키에 리프레시 토큰이 없는 경우
            if(!flag) {
                SecurityContextHolder.getContext().setAuthentication(null);
            }
                
        } catch (ExpiredJwtException e) {
            throw new AuthenticationServiceException("토큰이 만료되었습니다.");
        } catch (JwtException e) {
            throw new AuthenticationServiceException("토큰 인증에 실패하였습니다.");
        }

        filterChain.doFilter(request, response);
    }

}
