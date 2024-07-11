package org.example.popunivkotlin.controller

import org.example.popunivkotlin.dto.ApiResponse
import org.example.popunivkotlin.service.DashboardService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class DashboardController (
    private val dashboardService: DashboardService
) {

    @GetMapping("/dashboard")
    fun getDashboard() = ApiResponse.success(dashboardService.getDashboard())
}