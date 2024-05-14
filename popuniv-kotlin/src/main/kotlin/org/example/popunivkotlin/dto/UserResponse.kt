package org.example.popunivkotlin.dto

import org.example.popunivkotlin.entity.University
import org.example.popunivkotlin.entity.User

class LoginResponse (
    val email: String,
    val nickname: String,
    val token: String
)

class UserInfoResponse (
    // id, email, nickname, role, group
    val id: Long,
    val email: String,
    val nickname: String,
    val role: String,
    val university: University
) {
    companion object {
        fun from(user: User) = UserInfoResponse(
            id = user.id,
            email = user.email,
            nickname = user.nickname,
            role = user.role.name,
            university = user.university
        )
    }
}