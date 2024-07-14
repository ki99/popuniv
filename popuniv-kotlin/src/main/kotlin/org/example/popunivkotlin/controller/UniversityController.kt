package org.example.popunivkotlin.controller

import org.example.popunivkotlin.dto.ApiResponse
import org.example.popunivkotlin.entity.University
import org.example.popunivkotlin.service.UniversityService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/university")
class UniversityController (
    private val universityService: UniversityService
) {

    @GetMapping("")
    fun getUniversities() = ApiResponse.success(universityService.getUniversities())
}