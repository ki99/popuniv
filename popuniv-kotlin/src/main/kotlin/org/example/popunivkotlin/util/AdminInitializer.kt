package org.example.popunivkotlin.util

import org.example.popunivkotlin.common.Role
import org.example.popunivkotlin.entity.User
import org.example.popunivkotlin.repository.UserRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class AdminInitializer(
    private val userRepository: UserRepository,
    private val encoder: PasswordEncoder
) : ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        // userRepository.save(User("admin@admin.com", encoder.encode("1admin2"), null, "admin", Role.ADMIN))
    }
}