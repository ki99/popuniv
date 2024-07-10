package org.example.popunivkotlin.util

import org.example.popunivkotlin.common.Role
import org.example.popunivkotlin.entity.University
import org.example.popunivkotlin.entity.User
import org.example.popunivkotlin.repository.UniversityRepository
import org.example.popunivkotlin.repository.UserRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class Initializer(
    private val userRepository: UserRepository,
    private val universityRepository: UniversityRepository,
    private val encoder: PasswordEncoder,
    private val redisUtil: RedisUtil,
    private val redisTemplate: RedisTemplate<String, Any>
) : ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        if (!universityRepository.findById(1).isPresent) {
            var university = University("Popuniv University")
            universityRepository.save(university)
            userRepository.save(User("admin@admin.com", encoder.encode("1admin2"), university, "admin", Role.ADMIN))
            university = University("Test University")
            universityRepository.save(university)
        }

        if (redisTemplate.opsForValue().get("user:1_univ:1") == null) {
            redisTemplate.opsForValue().set("user:1_univ:1", "0")
        }

        // if not already exist key total_clicks, store redis (key, value) : ("total_clicks", emptyMap<String, Any>()) using redisUtil
        if (redisTemplate.hasKey("total_clicks").not()) {
            redisUtil.jsonSet("total_clicks", "$", emptyMap<String, Any>())

            val universityCount = universityRepository.count().toInt()

            for (i in 1..universityCount) {
                redisUtil.jsonSet("total_clicks", "$.univ_$i", "0")
            }
        }
    }
}