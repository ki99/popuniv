package org.example.popunivkotlin.dto

class JoinRequest (
    val email: String,
    val password: String,
    val passwordCheck: String,
    val nickname: String,
    val selectedId: Long,
)