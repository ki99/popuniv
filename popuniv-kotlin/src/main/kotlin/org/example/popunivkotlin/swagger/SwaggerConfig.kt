package org.example.popunivkotlin.swagger

import io.swagger.v3.oas.models.Components
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.security.SecurityRequirement
import io.swagger.v3.oas.models.security.SecurityScheme
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

private const val SECURITY_SCHEME_NAME = "authorization"

@Configuration
class SwaggerConfig {
    @Bean
    fun openAPI(): OpenAPI = OpenAPI()
        .components(Components()
            .addSecuritySchemes(SECURITY_SCHEME_NAME, SecurityScheme()
                .name(SECURITY_SCHEME_NAME)
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")))
        .addSecurityItem(SecurityRequirement().addList(SECURITY_SCHEME_NAME))
        .info(apiInfo())

    private fun apiInfo() = Info()
        .title("Swagger")
        .description("popuniv API")
        .version("1.0.0")
}