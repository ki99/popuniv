package org.example.popunivkotlin.service

import org.example.popunivkotlin.dto.UserInfoResponse
import org.example.popunivkotlin.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    private val userRepository: UserRepository,
    private val encoder: PasswordEncoder
) {
    @Transactional(readOnly = true)
    fun getUserInfo(email: String) = UserInfoResponse.from(userRepository.findByEmail(email)!!)
}