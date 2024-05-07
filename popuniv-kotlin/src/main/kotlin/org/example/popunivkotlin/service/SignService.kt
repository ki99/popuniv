package org.example.popunivkotlin.service

import jakarta.transaction.Transactional
import org.example.popunivkotlin.common.Role
import org.example.popunivkotlin.dto.JoinRequest
import org.example.popunivkotlin.entity.User
import org.example.popunivkotlin.repository.UniversityRepository
import org.example.popunivkotlin.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
@Transactional
class SignService (
    private val userRepository: UserRepository,
    private val universityRepository: UniversityRepository,
    private val encoder: PasswordEncoder
) {
    fun join(joinRequest: JoinRequest) {
        if (joinRequest.password != joinRequest.passwordCheck) {
            throw IllegalArgumentException("password not match")
        }
        if (userRepository.existsByEmail(joinRequest.email)) {
            throw IllegalArgumentException("email already exists")
        }
        if (userRepository.existsByNickname(joinRequest.nickname)) {
            throw IllegalArgumentException("nickname already exists")
        }
        val university = universityRepository.findById(joinRequest.selectedId)
            .orElseThrow { IllegalArgumentException("university not found") }

        // Password Encoding


        val user = User(
            email = joinRequest.email,
            password = encoder.encode(joinRequest.password),
            nickname = joinRequest.nickname,
            university = university,
            role = Role.USER
        )
        userRepository.save(user)
    }
}