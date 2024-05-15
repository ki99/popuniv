package org.example.popunivkotlin.util

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
    private val encoder: PasswordEncoder
) : ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        // universityRepository.save(University("popuniv"))
        // userRepository.save(User("admin@admin.com", encoder.encode("1admin2"), null, "admin", Role.ADMIN))
    }
}