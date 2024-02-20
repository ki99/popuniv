package com.kiworld.popuniv.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.kiworld.popuniv.entity.Role;
import com.kiworld.popuniv.jwt.JwtTokenFilter;
import com.kiworld.popuniv.service.UserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserService userService;
    private static String secretKey = "f052b4422c82fb007c3b499e275e957af125eb6ef097d0161338084a815c2de7";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .httpBasic(basic -> basic.disable())
                .formLogin((auth) -> auth.disable())
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new JwtTokenFilter(userService, secretKey), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/auth/join", "/auth/login").permitAll()
                        .requestMatchers("/auth/admin/**").hasAuthority(Role.ADMIN.name())
                        .anyRequest().permitAll()
                )
                .build();
    }
}
