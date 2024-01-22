package com.kiworld.popuniv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kiworld.popuniv.entity.University;

public interface UniversityRepository extends JpaRepository<University, Integer>{
  
}
