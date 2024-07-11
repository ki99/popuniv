package org.example.popunivkotlin.controller

import org.example.popunivkotlin.dto.ApiResponse
import org.example.popunivkotlin.dto.ClickRequest
import org.example.popunivkotlin.security.UserAuthorize
import org.example.popunivkotlin.service.ClickService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@UserAuthorize
@RestController
@RequestMapping("/api/click")
class ClickController (
    private val clickService: ClickService,
) {

    // getMapping with variable group_id
    // we should use User information and group_id parameter
    @GetMapping("/{universityId}")
    fun getClicks(@AuthenticationPrincipal user: User, @PathVariable universityId: Long) = ApiResponse.success(clickService.getClicks(user, universityId))

    @PutMapping("/{universityId}")
    fun click(@AuthenticationPrincipal user: User, @PathVariable universityId: Long, @RequestBody requestBody: ClickRequest) = ApiResponse.success(clickService.click(user, universityId, requestBody))
}