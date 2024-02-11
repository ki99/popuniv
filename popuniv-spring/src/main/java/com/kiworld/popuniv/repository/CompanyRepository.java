package com.kiworld.popuniv.repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kiworld.popuniv.entity.Company;

@Qualifier("companyRepository")
public interface CompanyRepository extends JpaRepository<Company, Integer>{
  
}
