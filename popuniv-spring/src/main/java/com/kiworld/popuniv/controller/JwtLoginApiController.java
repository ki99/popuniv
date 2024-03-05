package com.kiworld.popuniv.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.dto.JoinRequest;
import com.kiworld.popuniv.dto.MessageResponse;
import com.kiworld.popuniv.dto.TokenResponse;
import com.kiworld.popuniv.dto.UserResponse;
import com.kiworld.popuniv.dto.LoginRequest;
import com.kiworld.popuniv.entity.User;
import com.kiworld.popuniv.entity.UserGroup;
import com.kiworld.popuniv.jwt.JwtTokenUtil;
import com.kiworld.popuniv.service.UserGroupService;
import com.kiworld.popuniv.service.UserService;

import ch.qos.logback.core.subst.Token;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/auth")
public class JwtLoginApiController {

    @Autowired
    private final UserService userService;
    private final UserGroupService userGroupService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody JoinRequest joinRequest) {

        MessageResponse joinResponse = new MessageResponse();

        // 닉네임 중복 체크
        if(userService.checkNicknameDuplicate(joinRequest.getNickname())) {
            joinResponse.setMessage("이미 존재하는 닉네임입니다.");
            return ResponseEntity.badRequest().body(joinResponse);
        }
        // password와 passwordCheck가 같은지 체크
        if (!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
            joinResponse.setMessage("비밀번호가 일치하지 않습니다.");
            return ResponseEntity.badRequest().body(joinResponse);
        }

        if (!JoinRequest.isValidEmail(joinRequest.getEmail())) {
            joinResponse.setMessage("이메일 형식이 올바르지 않습니다.");
            return ResponseEntity.badRequest().body(joinResponse);
        } else {
            try {
                userService.join(joinRequest);
                joinResponse.setMessage("회원가입 성공");
                return ResponseEntity.ok().body(joinResponse);
            } catch (Exception e) {
                joinResponse.setMessage("회원가입 중 오류가 발생했습니다.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(joinResponse);
            }
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        User user = userService.login(loginRequest);

        if (user == null) {
            MessageResponse loginResponse = new MessageResponse();
            loginResponse.setMessage("아이디나 비밀번호가 틀렸습니다.");
            return ResponseEntity.badRequest().body(loginResponse);
        } else {
            String secretKey = "f052b4422c82fb007c3b499e275e957af125eb6ef097d0161338084a815c2de7";
            long expireTimeMs = 1000 * 60 * 60 * 24; // Token 유효 시간 = 60분 * 24

            String jwtToken = JwtTokenUtil.createToken(user.getEmail(), secretKey, expireTimeMs);

            TokenResponse tokenResponse = new TokenResponse(jwtToken);
            return ResponseEntity.ok().body(tokenResponse);
        }
    }

    @GetMapping("/info")
    public ResponseEntity<UserResponse> userInfo(Authentication auth) {
        // join with User and UserGroup
        User user = userService.getLoginUserByEmail(auth.getName());
        UserGroup userGroup = userGroupService.findByUserId(user.getId());
        UserResponse userResponse = new UserResponse(user, userGroup);
        return ResponseEntity.ok().body(userResponse);

    }

    @GetMapping("/admin")
    public String adminPage() {
        return "관리자 페이지 접근 성공";
    }
}