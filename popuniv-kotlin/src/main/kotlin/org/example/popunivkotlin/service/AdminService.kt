package org.example.popunivkotlin.service

import org.example.popunivkotlin.common.Role
import org.example.popunivkotlin.dto.UserInfoResponse
import org.example.popunivkotlin.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AdminService(private val userRepository: UserRepository) {
    @Transactional(readOnly = true)
    fun getUsers() : List<UserInfoResponse> = userRepository.findAllByRole(Role.USER).map(UserInfoResponse::from)
}