package com.kiworld.popuniv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.entity.University;
import com.kiworld.popuniv.repository.UniversityRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@Tag(name = "DashBoard", description = "DashBoard 정보를 전송하는 API.")

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
  @GetMapping("/dashboard/{organization_type}")
  @CrossOrigin(origins = "http://localhost:3000")
  @Operation(summary = "Ornazination에 속한 subOrganization들의 총 click 개수들")
  public ResponseEntity<Object> getDashboard(@PathVariable("organization_type") String organization_type) {
    HashMap<String, Long> dashboard_hash = new HashMap<>();
    Repository repository = repositoryService.getRepositoryService(organization_type);
    List<subOrganization> subOrganizations = repository.findAll();
    for (subOrganization subOrganization : subOrganizations) {
      String subOrganization_name = subOrganization.getName();
      Long value = redisTemplate.opsForValue().get(organization_type + "_" + subOrganization_name + "_clicks");
      if (value != null) {
        dashboard_hash.put(subOrganization_name, value);
      }
    }
    return ResponseEntity.ok(dashboard_hash);
  }
}
