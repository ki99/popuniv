package com.kiworld.popuniv.service;

import org.springframework.stereotype.Service;

import com.kiworld.popuniv.entity.Group;
import com.kiworld.popuniv.repository.GroupRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;

    public Group findById(long id) {
        return groupRepository.findById(id);
    }
}
