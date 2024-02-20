package com.kiworld.popuniv.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.dto.GroupRequest;
import com.kiworld.popuniv.entity.Group;
import com.kiworld.popuniv.entity.GroupType;
import com.kiworld.popuniv.repository.GroupRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/group")
@Tag(name = "Group", description = "Group 정보를 전송하는 API (university, company...).")
public class GroupController {

    private final GroupRepository groupRepository;
    private final RedisTemplate<String, Long> redisTemplate;

    @Autowired
    public GroupController(GroupRepository groupRepository, RedisTemplate<String, Long> redisTemplate) {
        this.groupRepository = groupRepository;
        this.redisTemplate = redisTemplate;
    }

    @GetMapping("")
    @Operation(summary = "모든 group에 대한 정보")
    public ResponseEntity<Object> getGroups(@RequestParam GroupType type) {
        // fetch groups from group table using group_type column

        return ResponseEntity.ok(groupRepository.findByType(type));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "특정 group에 대한 정보")
    public ResponseEntity<Object> getSuborganization(@PathVariable("id") String id) {
        // fetch university_names from university table
        Group group = groupRepository.findById(Integer.parseInt(id)).get();
        return ResponseEntity.ok(group);
    }

    @PostMapping("")
    @Operation(summary = "group 추가하기")
    public ResponseEntity<Object> postGroup(@RequestBody GroupRequest groupRequest) {
        // fetch university_names from university table
        Group group = new Group();
        group.setName(groupRequest.getName());
        group.setType(groupRequest.getType());
        groupRepository.save(group);
        redisTemplate.opsForValue().set(group.getId() + "_clicks", 0L);
        return ResponseEntity.ok(group);
    }

}
