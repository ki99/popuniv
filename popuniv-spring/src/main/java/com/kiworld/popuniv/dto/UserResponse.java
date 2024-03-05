package com.kiworld.popuniv.dto;

import com.kiworld.popuniv.entity.Role;
import com.kiworld.popuniv.entity.User;
import com.kiworld.popuniv.entity.UserGroup;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private long id;
    private String email;
    private String nickname;
    private Role role;
    private int groupId;
}
