package com.kiworld.popuniv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.dto.DashboardResponse;
import com.kiworld.popuniv.entity.Group;
import com.kiworld.popuniv.entity.GroupType;
import com.kiworld.popuniv.repository.GroupRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api")
@Tag(name = "DashBoard", description = "DashBoard 정보를 전송하는 API.")

public class DashboardController {

  private final GroupRepository groupRepository;
  private final RedisTemplate<String, Long> redisTemplate;

  @Autowired
  public DashboardController(RedisTemplate<String, Long> redisTemplate, GroupRepository groupRepository) {
    this.groupRepository = groupRepository;
    this.redisTemplate = redisTemplate;
  }
  
  // return ordered list of clickcounts of all universities
  // response will be like this: { "kaist" : 100, "snu" : 200 }
  @GetMapping("/dashboard")
  @Operation(summary = "group=의 총 click 개수들")
  public ResponseEntity<Object> getDashboard(@RequestParam GroupType type) {
    List<DashboardResponse> dashboardDataList = new ArrayList<>();

    // filter by type
    List<Group> groups = groupRepository.findByType(type);

    for (Group group : groups) {
        int group_id = group.getId();
        Long value = redisTemplate.opsForValue().get(group_id + "_clicks");

        if (value != null) {
            DashboardResponse dashboardData = new DashboardResponse(group, value);
            dashboardDataList.add(dashboardData);
        }
    }

    return ResponseEntity.ok(dashboardDataList);
    } 
}
