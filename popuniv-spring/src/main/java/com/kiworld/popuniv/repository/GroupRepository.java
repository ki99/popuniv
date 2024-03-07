package com.kiworld.popuniv.repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kiworld.popuniv.entity.Group;
import com.kiworld.popuniv.entity.GroupType;

import java.util.List;


public interface GroupRepository extends JpaRepository<Group, Integer>{

    List<Group> findByType(GroupType type);
    Group findById(long id);
  
}
