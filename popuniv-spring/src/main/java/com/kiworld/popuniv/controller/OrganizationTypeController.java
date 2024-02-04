package com.kiworld.popuniv.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.entity.OrganizationType;
import com.kiworld.popuniv.entity.University;
import com.kiworld.popuniv.repository.UniversityRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@Tag(name = "Organization", description = "Organization 정보를 전송하는 API (University, Company...).")
public class OrganizationTypeController {
  
  @GetMapping("/{organization_type}")
  @CrossOrigin(origins = "http://localhost:3000")
  public ResponseEntity<Object> getOrganizationTypes() {
    // fetch university_names from university table
    OrganizationType[] organizationTypes = OrganizationType.values();
    return ResponseEntity.ok(organizationTypes);
  }
}
