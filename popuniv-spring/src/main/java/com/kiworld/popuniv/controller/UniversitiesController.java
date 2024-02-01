package com.kiworld.popuniv.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kiworld.popuniv.entity.University;
import com.kiworld.popuniv.repository.UniversityRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UniversitiesController {
  private final UniversityRepository UniversityRepository;

  @Autowired
  public UniversitiesController(UniversityRepository UniversityRepository) {
    this.UniversityRepository = UniversityRepository;
  }
  
  // return ordered list of clickcounts of all universities
  // response will be like this: { "kaist" : 100, "snu" : 200 }
  @GetMapping("/universities")
  @CrossOrigin(origins = "http://localhost:3000")
  public ResponseEntity<Object> getDashboard() {
    // fetch university_names from university table
    List<University> university_names = UniversityRepository.findAll();
    return ResponseEntity.ok(university_names);
  }
  @PostMapping("/universities")
  public ResponseEntity<Object> addUniversity(@RequestBody University university) {
    UniversityRepository.save(university);
    return ResponseEntity.ok(university);
  }
  
}
