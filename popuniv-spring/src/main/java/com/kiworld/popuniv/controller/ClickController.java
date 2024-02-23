package com.kiworld.popuniv.controller;

import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.dto.AllClickResponse;
import com.kiworld.popuniv.dto.ClickRequest;
import com.kiworld.popuniv.dto.ClickResponse;
import com.kiworld.popuniv.dto.MessageResponse;
import com.kiworld.popuniv.entity.User;
import com.kiworld.popuniv.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@Tag(name = "Click", description = "Click관련 정보를 DB에 업데이트, 전송하는 API.")
@RestController
@RequestMapping("/api/click")
public class ClickController {
    private final RedisTemplate<String, Long> redisTemplate;
    private final UserService userService;

    public ClickController(RedisTemplate<String, Long> redisTemplate, UserService userService) {
        this.redisTemplate = redisTemplate;
        this.userService = userService;
    }

    @GetMapping("")
    @Operation(summary = "type의 모든 group에 대한 모든 유저의 click 개수의 총합")
    public ResponseEntity<AllClickResponse> getClick(@RequestParam String type) {
        String total_key = type + "_clicks";
        ValueOperations<String, Long> valueOperations = redisTemplate.opsForValue();
        long value = valueOperations.get(total_key);
        AllClickResponse allClickResponse = new AllClickResponse();
        allClickResponse.setAllClickCount(value);
        return ResponseEntity.ok(allClickResponse);
    }

    @GetMapping("/{group_id}")
    @Operation(summary = "특정 group에 대한 유저의 click과, 모든 유저의 click 개수의 총합")
    public ResponseEntity<ClickResponse> getClicks(Authentication auth, @PathVariable("group_id") String group_id) {
        String total_key = group_id + "_clicks";
        User user;
        if (auth == null) user = userService.getLoginUserById(1L); else user = userService.getLoginUserByEmail(auth.getName());
        String user_key = user.getId() + "_" + group_id + "_clicks";
        ValueOperations<String, Long> valueOperations = redisTemplate.opsForValue();

        long total_value = valueOperations.get(total_key);
        long user_value = valueOperations.get(user_key);
        ClickResponse clickResponse = new ClickResponse();
        clickResponse.setUserClickCount(user_value);
        clickResponse.setAllClickCount(total_value);

        return ResponseEntity.ok(clickResponse);
    }

    @Operation(summary = "User의 Group에 click 개수 반영하기")
    @PutMapping("/{group_id}")
    public ResponseEntity<MessageResponse> postClicks(Authentication auth, @PathVariable("group_id") String group_id, @RequestBody ClickRequest requestBody) {
        long clickCount = requestBody.getClickCount();

        ValueOperations<String, Long> valueOperations = redisTemplate.opsForValue();
        User user;
        if (auth == null) user = userService.getLoginUserById(1L); else user = userService.getLoginUserByEmail(auth.getName());
        String user_key = user.getId() + "_" + group_id + "_clicks";
        String total_key = group_id + "_clicks";

        valueOperations.increment(user_key, clickCount);
        valueOperations.increment(total_key, clickCount);

        MessageResponse stringResponse = new MessageResponse();
        stringResponse.setMessage("Click count updated successfully");

        return ResponseEntity.ok(stringResponse);
    }
}
