package com.kiworld.popuniv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.entity.GroupType;
import com.kiworld.popuniv.entity.UserGroup;
import com.kiworld.popuniv.repository.GroupRepository;
import com.kiworld.popuniv.repository.UserGroupRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Click", description = "User가 선택했던 Group의 id를 얻어오기 위한 API.")
@RestController
@RequestMapping("/api")
public class UserGroupController {

    private final UserGroupRepository userGroupRepository;

    @Autowired
    public UserGroupController(UserGroupRepository userGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }

    @GetMapping("/user/{user_id}/group")
    @Operation(summary = "모든 group에 대한 정보")
    public ResponseEntity<Object> getGroup(@PathVariable("user_id") String user_id) {
        // fetch groups from group table using group_type column

        return ResponseEntity.ok(userGroupRepository.findByUserId(Integer.parseInt(user_id)));

    }
    
}
