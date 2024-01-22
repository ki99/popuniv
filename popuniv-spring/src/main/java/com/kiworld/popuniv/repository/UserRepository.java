package com.kiworld.popuniv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kiworld.popuniv.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
  // make user repository
  
}
