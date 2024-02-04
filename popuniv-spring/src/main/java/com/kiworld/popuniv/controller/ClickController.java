package com.kiworld.popuniv.controller;

import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import java.util.Map;

@Tag(name = "데모", description = "swagger 데모 api 입니다.")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ClickController {
  private static final Logger logger = LoggerFactory.getLogger(ClickController.class);
  private final RedisTemplate<String, Long> redisTemplate;

  public ClickController(RedisTemplate<String, Long> redisTemplate) {
    this.redisTemplate = redisTemplate;
  }

  @GetMapping("/universities/{university_name}/clicks")
  @Operation(summary = "University의 전체 click 개수의 총합", description = "Get the number of clicks for a university")
  public Long getClicks(@PathVariable("university_name") String universityName) {
    ValueOperations<String, Long> valueOperations = redisTemplate.opsForValue();
    String key = universityName + "_clicks";
    Long clicks = valueOperations.get(key);
    return clicks;
  }
  @Operation(summary = "University에 대한 click 개수 반영하기", description = "Post the number of clicks for a university")
  @PostMapping("/universities/{university_name}/clicks")
  public Long recordClicks(@PathVariable("university_name") String universityName, @RequestBody Map<String, Long> requestBody) {
    long clickCount = requestBody.get("clickCount");

    ValueOperations<String, Long> valueOperations = redisTemplate.opsForValue();
    String key = universityName + "_clicks";

    long incrementedValue;
    if (redisTemplate.hasKey(key)) {
      logger.debug("key exists!");
      incrementedValue = valueOperations.increment(key, clickCount);
    } else {
      logger.debug("key not exists!");
      valueOperations.set(key, clickCount);
      incrementedValue = clickCount;
    }
    logger.debug("incrementedValue : {}", incrementedValue);

    return incrementedValue;
  }
  
}
