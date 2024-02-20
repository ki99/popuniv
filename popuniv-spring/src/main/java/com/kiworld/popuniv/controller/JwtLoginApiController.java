package com.kiworld.popuniv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.dto.JoinRequest;
import com.kiworld.popuniv.dto.LoginRequest;
import com.kiworld.popuniv.entity.User;
import com.kiworld.popuniv.jwt.JwtTokenUtil;
import com.kiworld.popuniv.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/auth")
public class JwtLoginApiController {

    @Autowired
    private final UserService userService;

    @PostMapping("/join")
    public String join(@RequestBody JoinRequest joinRequest) {

        // loginId 중복 체크
        if(userService.checkLoginIdDuplicate(joinRequest.getLoginId())) {
            return "로그인 아이디가 중복됩니다.";
        }
        // 닉네임 중복 체크
        if(userService.checkNicknameDuplicate(joinRequest.getNickname())) {
            return "닉네임이 중복됩니다.";
        }
        // password와 passwordCheck가 같은지 체크
        if(!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
            return"바밀번호가 일치하지 않습니다.";
        }

        if(!JoinRequest.isValidEmail(joinRequest.getEmail())) {
            return "이메일 형식이 올바르지 않습니다.";
        }

        userService.join(joinRequest);
        return "회원가입 성공";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {

        User user = userService.login(loginRequest);

        // 로그인 아이디나 비밀번호가 틀린 경우 global error return
        if(user == null) {
            return"로그인 아이디 또는 비밀번호가 틀렸습니다.";
        }

        // 로그인 성공 => Jwt Token 발급

        String secretKey = "f052b4422c82fb007c3b499e275e957af125eb6ef097d0161338084a815c2de7";
        long expireTimeMs = 1000 * 60 * 60 * 24;     // Token 유효 시간 = 60분 * 24

        String jwtToken = JwtTokenUtil.createToken(user.getLoginId(), secretKey, expireTimeMs);

        return jwtToken;
    }

    @GetMapping("/info")
    public ResponseEntity<User> userInfo(Authentication auth) {
        User loginUser = userService.getLoginUserByLoginId(auth.getName());

        // return with Json
        return ResponseEntity.ok().body(loginUser);
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "관리자 페이지 접근 성공";
    }
}