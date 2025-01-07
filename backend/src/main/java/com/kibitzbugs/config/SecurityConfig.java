package com.kibitzbugs.config;

import com.kibitzbugs.auth.JwtTokenProvider;
import com.kibitzbugs.exception.CustomAccessDeniedHandler;
import com.kibitzbugs.exception.CustomAuthenticationEntryPoint;
import com.kibitzbugs.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity()
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("#{private['base.url']}")
    private String baseUrl;

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .cors()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(baseUrl+"/auth/code").permitAll()
                .antMatchers(baseUrl+"/login/cnt", baseUrl+"/game/cnt").permitAll()
                .antMatchers(baseUrl+"/swagger-ui", baseUrl+"/swagger-ui/**", baseUrl+"/swagger-resources/**",
                        "/v3/api-docs", "/v3/api-docs/**", "/webjars/**").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint)
                .accessDeniedHandler(customAccessDeniedHandler)
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}
