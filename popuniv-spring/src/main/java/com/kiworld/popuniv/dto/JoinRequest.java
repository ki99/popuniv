package com.kiworld.popuniv.dto;

import com.kiworld.popuniv.entity.Role;
import com.kiworld.popuniv.entity.User;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JoinRequest {

    @NotBlank(message = "이메일이 비어있습니다.")
    private String email;

    @NotBlank(message = "비밀번호가 비어있습니다.")
    private String password;
    private String passwordCheck;

    @NotBlank(message = "닉네임이 비어있습니다.")
    private String nickname;

    // 비밀번호 암호화 X
    public User toEntity() {
        return User.builder()
                .password(this.password)
                .nickname(this.nickname)
                .email(this.email)
                .role(Role.USER)
                .build();
    }

    // 비밀번호 암호화
    public User toEntity(String encodedPassword) {
        return User.builder()
                .password(encodedPassword)
                .nickname(this.nickname)
                .email(this.email)
                .role(Role.USER)
                .build();
    }

    public static boolean isValidEmail(String email) {
        return email.contains("@");
    }
}