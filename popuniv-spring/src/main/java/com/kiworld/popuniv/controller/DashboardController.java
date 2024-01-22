package com.kiworld.popuniv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.entity.University;
import com.kiworld.popuniv.repository.UniversityRepository;

import org.springframework.web.bind.annotation.GetMapping;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

  private final UniversityRepository UniversityRepository;
  private final RedisTemplate<String, Long> redisTemplate;

  @Autowired
  public DashboardController(RedisTemplate<String, Long> redisTemplate, UniversityRepository UniversityRepository) {
    this.UniversityRepository = UniversityRepository;
    this.redisTemplate = redisTemplate;
  }
  
  // return ordered list of clickcounts of all universities
  // response will be like this: { "kaist" : 100, "snu" : 200 }
  @GetMapping("/dashboard")
  @CrossOrigin(origins = "http://localhost:3000")
  public ResponseEntity<Object> getDashboard() {
    HashMap<String, Long> dashboard_data = new HashMap<>();

    // fetch university_names from university table
    List<University> university_names = UniversityRepository.findAll();
    // for each university_name, fetch clickcount from redis
    for (University university : university_names) {
      String university_name = university.getName();
      // logging in springboot
      System.out.println("univ_name : " + university_name);
      Long value = redisTemplate.opsForValue().get(university_name + "_clicks");
      System.out.println("count : " + value);
      if (value != null) {
        dashboard_data.put(university_name, value);
      }
    }
    return ResponseEntity.ok(dashboard_data);
  }
}
