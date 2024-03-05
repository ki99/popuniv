package com.kiworld.popuniv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kiworld.popuniv.entity.Group;
import com.kiworld.popuniv.entity.GroupType;
import com.kiworld.popuniv.entity.UserGroup;

public interface UserGroupRepository extends JpaRepository<UserGroup, Integer> {

    UserGroup findByUserId(long int1);
      
}
