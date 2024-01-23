package com.kiworld.popuniv.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ClickController {
  private static final Logger logger = LoggerFactory.getLogger(ClickController.class);
  private final RedisTemplate<String, Long> redisTemplate;

  public ClickController(RedisTemplate<String, Long> redisTemplate) {
    this.redisTemplate = redisTemplate;
  }

  @GetMapping("/api/universities/{university_name}/clicks")
  public Long getClicks(@PathVariable("university_name") String universityName) {
    ValueOperations<String, Long> valueOperations = redisTemplate.opsForValue();
    String key = universityName + "_clicks";
    Long clicks = valueOperations.get(key);
    return clicks;
  }

  @PostMapping("/api/universities/{university_name}/clicks/{click_count}")
  public Long recordClicks(@PathVariable("university_name") String universityName,@PathVariable("click_count") Long clickCount) {

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
