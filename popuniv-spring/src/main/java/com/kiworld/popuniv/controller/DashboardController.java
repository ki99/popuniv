package com.kiworld.popuniv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.entity.Company;
import com.kiworld.popuniv.entity.Suborganization;
import com.kiworld.popuniv.entity.University;
import com.kiworld.popuniv.repository.CompanyRepository;
import com.kiworld.popuniv.repository.UniversityRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@Tag(name = "DashBoard", description = "DashBoard 정보를 전송하는 API.")

public class DashboardController {

  private final CompanyRepository companyRepository;
  private final UniversityRepository universityRepository;
  private final RedisTemplate<String, Long> redisTemplate;

  @Autowired
  public DashboardController(RedisTemplate<String, Long> redisTemplate, CompanyRepository companyRepository, UniversityRepository universityRepository) {
    this.companyRepository = companyRepository;
    this.universityRepository = universityRepository;
    this.redisTemplate = redisTemplate;
  }
  
  // return ordered list of clickcounts of all universities
  // response will be like this: { "kaist" : 100, "snu" : 200 }
  @GetMapping("/dashboard/{organization_type}")
  @CrossOrigin(origins = "http://localhost:3000")
  @Operation(summary = "Ornazination에 속한 subOrganization들의 총 click 개수들")
  public ResponseEntity<Object> getDashboard(@PathVariable("organization_type") String organization_type) {
    HashMap<String, Long> dashboard_hash = new HashMap<>();
    if (organization_type.equals("Company")) {
        List<Company> companies = companyRepository.findAll();
        for (Company company : companies) {
          String company_name = company.getName();
          Long value = redisTemplate.opsForValue().get(organization_type + "_" + company_name + "_clicks");
          if (value != null) {
            dashboard_hash.put(company_name, value);
          }
        }
        return ResponseEntity.ok(dashboard_hash);
      } else if (organization_type.equals("University")) {
        List<University> universities= universityRepository.findAll();
        for (University university : universities) {
          String university_name = university.getName();
          Long value = redisTemplate.opsForValue().get(organization_type + "_" + university_name + "_clicks");
          if (value != null) {
            dashboard_hash.put(university_name, value);
          }
        }
        return ResponseEntity.ok(dashboard_hash);
      } else {
          // 예외 처리: 유효하지 않은 organization_type 값에 대한 처리
          return ResponseEntity.badRequest().body("Invalid organization_type");
      }
    
  }
}
