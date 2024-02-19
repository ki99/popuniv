package com.kiworld.popuniv.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.entity.Company;
import com.kiworld.popuniv.entity.University;
import com.kiworld.popuniv.repository.CompanyRepository;
import com.kiworld.popuniv.repository.UniversityRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/company")
@Tag(name = "Suborganization", description = "Suborganization 정보를 전송하는 API (University, Company...).")
public class CompanyController {

    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @GetMapping("")
    @Operation(summary = "모든 회사에 대한 정보")
    public ResponseEntity<Object> getSuborganizations() {
        // fetch university_names from university table
        return ResponseEntity.ok(companyRepository.findAll());
    }
    
    @GetMapping("/{company_id}")
    @Operation(summary = "특정 회사에 대한 정보")
    public ResponseEntity<Object> getSuborganization(@PathVariable("suborganization_id") String company_id) {
        // fetch university_names from university table
        Company company = companyRepository.findById(Integer.parseInt(company_id)).get();
        return ResponseEntity.ok(company);
    }

    @PostMapping("")
    @Operation(summary = "Company 추가하기")
    public ResponseEntity<Object> postSuborganization(@RequestBody SuborganizationRequest suborganizationRequest) {
        // fetch university_names from university table
        Company company = new Company();
        company.setName(suborganizationRequest.getName());
        companyRepository.save(company);
        return ResponseEntity.ok(company);
    }

}
