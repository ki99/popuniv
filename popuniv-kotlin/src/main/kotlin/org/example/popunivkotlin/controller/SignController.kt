package org.example.popunivkotlin.controller

import org.example.popunivkotlin.dto.ApiResponse
import org.example.popunivkotlin.dto.JoinRequest
import org.example.popunivkotlin.dto.LoginRequest
import org.example.popunivkotlin.service.SignService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class SignController (private val signService: SignService) {

    @PostMapping("/join")
    fun join(@RequestBody joinRequest: JoinRequest) = ApiResponse.success(signService.join(joinRequest))

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequest) = ApiResponse.success(signService.login(loginRequest))
}