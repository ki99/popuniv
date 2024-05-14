package org.example.popunivkotlin.repository

import org.example.popunivkotlin.common.Role
import org.example.popunivkotlin.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {
    fun existsByEmail(email: String): Boolean
    fun existsByNickname(nickname: String): Boolean
    fun findByEmail(email: String): User?
    fun findAllByRole(type: Role): List<User>
}