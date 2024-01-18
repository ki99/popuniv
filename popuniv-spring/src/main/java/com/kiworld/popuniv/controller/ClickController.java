package com.kiworld.popuniv.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.GenericToStringSerializer;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ClickController {
  private static final Logger logger = LoggerFactory.getLogger(ClickController.class);
  private final RedisTemplate<String, Long> redisTemplate;

  public ClickController(RedisTemplate<String, Long> redisTemplate) {
    this.redisTemplate = redisTemplate;
    
  }

  @PostMapping("/clicks")
  public Long recordClicks(@RequestBody ClickData clickData) {
      String groupName = clickData.getGroup();
      Long clickCount = clickData.getClickCount();
      logger.debug("targetName : {}", groupName);
      logger.debug("clickCount : {}", clickCount);

      ValueOperations<String, Long> valueOperations = redisTemplate.opsForValue();
      String key = groupName + "_clicks";

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
