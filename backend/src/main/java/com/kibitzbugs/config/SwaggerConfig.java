package com.kibitzbugs.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.GroupedOpenApi;
import org.springdoc.core.customizers.OpenApiCustomiser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi api() {
        return GroupedOpenApi.builder()
                .group("Kibitz bugs")
                .pathsToMatch("/api/**")
                .addOpenApiCustomiser(globalResponseOpenApiCustomiser())
                .build();
    }

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("Basic Auth", securityScheme))
                .addSecurityItem(securityRequirement)
                .info(new Info().title("Kibitz bugs API"));
    }

    @Bean
    public OpenApiCustomiser globalResponseOpenApiCustomiser() {
        return openApi -> {
            openApi.getPaths().values().forEach(pathItem -> pathItem.readOperations().forEach(operation -> {
                ApiResponses apiResponses = operation.getResponses();
                if(!operation.getResponses().containsKey("401")
                        && operation.getSecurity() != null
                        && operation.getSecurity().contains(securityRequirement)) {
                    apiResponses.addApiResponse("401", new ApiResponse()
                            .description("인증되지 않은 유저입니다."));
                }
                apiResponses.addApiResponse("405", new ApiResponse()
                        .description("(요청한 메소드)은/는 지원하지 않는 메소드입니다. [지원하는 메소드]에서 선택해주세요."));

            }));
        };
    }

    // 쿠키 내 리프레시 토큰으로 인증
    private final SecurityScheme securityScheme = new SecurityScheme()
            .type(SecurityScheme.Type.APIKEY).in(SecurityScheme.In.COOKIE).name("REFRESH-TOKEN");
    private final SecurityRequirement securityRequirement = new SecurityRequirement().addList("Basic Auth");



//    springfox 사용시
//    @Bean
//    public Docket api() {
//        // Docket: Springfox가 swagger 문서를 만들 때 사용하는 커스터마이징 가능한 객체
//        return new Docket(DocumentationType.OAS_30)
////                .securityContexts(Collections.singletonList(securityContext()))
////                .securitySchemes(List.of(apiKey()))
//                .globalResponses(HttpMethod.GET, responses)
//                .globalResponses(HttpMethod.POST, responses)
//                .globalResponses(HttpMethod.PUT, responses)
//                .globalResponses(HttpMethod.DELETE, responses)
//                .useDefaultResponseMessages(false) // 기본 응답 메시지 작성 x
//                .select() // ApiSelectorBuilder 인스턴스 리턴 (swagger 엔드포인트 제어)
//                .apis(RequestHandlerSelectors.basePackage("com.kibitzbugs.controller")) // 현재 패키지 내 controller만 swagger에 추가
//                .paths(PathSelectors.ant("/api/**")) // /api/**에 해당하는 path만 swagger에 추가
//                .build()
//                .host(baseUrl)
//                .apiInfo(new ApiInfoBuilder()
//                        .title("Kibitz bugs API")
//                        .build());
//    }
//
//    List<Response> responses = Arrays.asList(
//        new ResponseBuilder()
//                .code("401")
//                .description("인증되지 않은 유저입니다.")
//                .isDefault(true)
//                .build(),
//        new ResponseBuilder()
//                .code("405")
//                .description("(요청한 메소드)은/는 지원하지 않는 메소드입니다. [지원하는 메소드]에서 선택해주세요.")
//                .isDefault(true)
//                .build()
//    );

}
