package org.example.popunivkotlin.controller

import org.example.popunivkotlin.dto.ApiResponse
import org.example.popunivkotlin.security.UserAuthorize
import org.example.popunivkotlin.service.UserService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@UserAuthorize
@RestController
@RequestMapping("/user")
class UserController(private val userService: UserService) {
    @GetMapping
    fun getUserInfo(@AuthenticationPrincipal user: User) =
        ApiResponse.success(userService.getUserInfo(user.username))
}