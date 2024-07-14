package org.example.popunivkotlin.service

import org.example.popunivkotlin.repository.UniversityRepository
import org.springframework.stereotype.Service

@Service
class UniversityService (
    private val universityRepository: UniversityRepository
) {
    fun getUniversities() = universityRepository.findAll()
}