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
    private val redisUtil: RedisUtil,
) : ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        if (!universityRepository.findById(1).isPresent) {
            var university = University("Popuniv University")
            universityRepository.save(university)
            userRepository.save(User("admin@admin.com", encoder.encode("1admin2"), university, "admin", Role.ADMIN))
            university = University("Test University")
            universityRepository.save(university)
        }

        if (redisUtil.hasKey("user:1_univ:1").not()) {
            redisUtil.set("user:1_univ:1", 0)
        }

        // if not already exist key total_clicks, store redis (key, value) : ("total_clicks", emptyMap<String, Any>()) using redisUtil
        if (redisUtil.hasKey("total_clicks").not()) {
            redisUtil.jsonSet("total_clicks", "$", emptyMap<String, Any>())

            val universities = universityRepository.findAll()

            for (university in universities) {
                val escapedName = university.name.replace("\"", "\\\"")
                redisUtil.jsonSet("total_clicks", "$['${escapedName}']", 0)
            }
        }
    }
}