package org.example.popunivkotlin.repository

import org.example.popunivkotlin.entity.University
import org.springframework.data.jpa.repository.JpaRepository

interface UniversityRepository : JpaRepository<University, Long> {

}