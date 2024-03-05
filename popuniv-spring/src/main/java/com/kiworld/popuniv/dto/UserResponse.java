package com.kiworld.popuniv.dto;

import com.kiworld.popuniv.entity.User;
import com.kiworld.popuniv.entity.UserGroup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
    private User user;
    private UserGroup userGroup;
}
