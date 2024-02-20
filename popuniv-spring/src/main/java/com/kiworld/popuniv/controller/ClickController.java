package com.kiworld.popuniv.controller;

import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.dto.ClickData;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@Tag(name = "Click", description = "Click관련 정보를 DB에 업데이트, 전송하는 API.")
@RestController
@RequestMapping("/api/click")
public class ClickController {
    private final RedisTemplate<String, Long> redisTemplate;

    public ClickController(RedisTemplate<String, Long> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @GetMapping("/{organization_type}/{suborganization_id}")
    @Operation(summary = "Ornazination의 subOrganization에 대한 모든 유저의 click 개수의 총합")
    public Long getClicks(@PathVariable("organization_type") String organization_type, @PathVariable("suborganization_id") String suborganization_id) {
        ValueOperations<String, Long> valueOperations = redisTemplate.opsForValue();
        String key = organization_type + "_" + suborganization_id + "_clicks";
        Long clicks = valueOperations.get(key);
        return clicks;
    }
    @Operation(summary = "User의 Organization의 subOrganization에 대한 click 개수 반영하기")
    @PutMapping("/{organization_type}/{suborganization_id}")
    public boolean postClicks(@PathVariable("organization_type") String organization_type, @PathVariable("suborganization_id") String suborganization_id, @RequestBody ClickData requestBody) {
        long clickCount = requestBody.getClickCount();

        ValueOperations<String, Long> valueOperations = redisTemplate.opsForValue();
        int user_id = 1;
        String user_key = user_id + "_" + organization_type + "_" + suborganization_id + "_clicks";
        String total_key = organization_type + "_" + suborganization_id + "_clicks";

        if (!redisTemplate.hasKey(user_key)) {
            valueOperations.set(user_key, 0L);
        }
        if (!redisTemplate.hasKey(total_key)) {
            valueOperations.set(total_key, 0L);
        }

        valueOperations.increment(user_key, clickCount);
        valueOperations.increment(total_key, clickCount);

        return true;
    }
}
