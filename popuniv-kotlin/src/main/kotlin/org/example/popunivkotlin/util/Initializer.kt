package org.example.popunivkotlin.util

import org.example.popunivkotlin.common.Role
import org.example.popunivkotlin.entity.University
import org.example.popunivkotlin.entity.User
import org.example.popunivkotlin.repository.UniversityRepository
import org.example.popunivkotlin.repository.UserRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class Initializer(
    private val userRepository: UserRepository,
    private val universityRepository: UniversityRepository,
    private val encoder: PasswordEncoder,
    private val redisUtil: RedisUtil
) : ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        if (universityRepository.findById(1).isPresent) {
            return
        }
        universityRepository.save(University("popuniv"))
        userRepository.save(User("admin@admin.com", encoder.encode("1admin2"), null, "admin", Role.ADMIN))
        val key = "university:1"
        val path = "$.users.1"
        val value = mapOf("total_clicks" to 0, "users" to emptyMap<String, Any>())
        redisUtil.jsonSet(key, "$", value)
        redisUtil.jsonSet(key, path, 0)
    }
}