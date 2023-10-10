package com.kibitzbugs.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Value("${base-url}")
    private String baseUrl;

    @Bean
    public Docket api() {
        // Docket: Springfox가 swagger 문서를 만들 때 사용하는 커스터마이징 가능한 객체
        return new Docket(DocumentationType.OAS_30)
//                .securityContexts(Collections.singletonList(securityContext()))
//                .securitySchemes(List.of(apiKey()))
                .useDefaultResponseMessages(false) // 기본 응답 메시지 작성 x
                .select() // ApiSelectorBuilder 인스턴스 리턴 (swagger 엔드포인트 제어)
                .apis(RequestHandlerSelectors.basePackage("com.kibitzbugs.controller")) // 현재 패키지 내 controller만 swagger에 추가
                .paths(PathSelectors.ant("/api/**")) // /api/**에 해당하는 path만 swagger에 추가
                .build()
                .host(baseUrl)
                .apiInfo(new ApiInfoBuilder()
                        .title("Kibitz bugs API")
                        .build());
    }

//    private SecurityContext securityContext() {
//        return SecurityContext.builder()
//                .securityReferences(defaultAuth())
//                .build();
//    }
//
//    private List<SecurityReference> defaultAuth() {
//        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
//        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
//        authorizationScopes[0] = authorizationScope;
//        return Arrays.asList(new SecurityReference("asdf", authorizationScopes));
//    }
//
//    private ApiKey apiKey() {
//        return new ApiKey("Refresh Token", "REFRESH-TOKEN", "header");
//    }

}
