package com.kiworld.popuniv.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.entity.University;
import com.kiworld.popuniv.entity.University;
import com.kiworld.popuniv.repository.UniversityRepository;
import com.kiworld.popuniv.repository.UniversityRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/university")
@Tag(name = "Suborganization", description = "Suborganization 정보를 전송하는 API (University, University...).")
public class UniversityController {

    private final UniversityRepository universityRepository;

    @Autowired
    public UniversityController(UniversityRepository UniversityRepository) {
        this.universityRepository = UniversityRepository;
    }

    @GetMapping("")
    @Operation(summary = "모든 대학에 대한 정보")
    public ResponseEntity<Object> getSuborganizations() {
        // fetch university_names from university table
        return ResponseEntity.ok(universityRepository.findAll());
    }
    
    @GetMapping("/{university_id}")
    @Operation(summary = "특정 대학에 대한 정보")
    public ResponseEntity<Object> getSuborganization(@PathVariable("university_id") String university_id) {
        // fetch university_names from university table
        University University = universityRepository.findById(Integer.parseInt(university_id)).get();
        return ResponseEntity.ok(University);
    }

    @PostMapping("")
    @Operation(summary = "University 추가하기")
    public ResponseEntity<Object> postSuborganization(@RequestBody SuborganizationRequest suborganizationRequest) {
        // fetch university_names from university table
        University University = new University();
        University.setName(suborganizationRequest.getName());
        universityRepository.save(University);
        return ResponseEntity.ok(University);
    }

}
