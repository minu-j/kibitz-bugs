package com.kibitzbugs.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Arrays;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket api() {
        // Docket: Springfox가 swagger 문서를 만들 때 사용하는 커스터마이징 가능한 객체
        return new Docket(DocumentationType.OAS_30)
                .select() // ApiSelectorBuilder 인스턴스 리턴 (swagger 엔드포인트 제어)
                .apis(RequestHandlerSelectors.basePackage("com.kibitzbugs")) // 현재 패키지 내 controller만 swagger에 추가
                .paths(PathSelectors.ant("/api/**")) // /api/**에 해당하는 path만 swagger에 추가
                .build()
                .apiInfo(new ApiInfoBuilder()
                        .title("Kibitz bugs API")
                        .build());
    }

}
