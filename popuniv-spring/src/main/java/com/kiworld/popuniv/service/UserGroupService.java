package com.kiworld.popuniv.service;

import org.springframework.stereotype.Service;

import com.kiworld.popuniv.entity.UserGroup;
import com.kiworld.popuniv.repository.UserGroupRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserGroupService {
    private final UserGroupRepository userGroupRepository;

    public UserGroup findByUserId(long userId) {
        return userGroupRepository.findByUserId(userId);
    }
}
