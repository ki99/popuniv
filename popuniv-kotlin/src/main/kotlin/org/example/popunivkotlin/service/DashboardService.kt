package org.example.popunivkotlin.service

import com.fasterxml.jackson.databind.ObjectMapper
import org.example.popunivkotlin.util.RedisUtil
import org.springframework.stereotype.Service

@Service
class DashboardService (
    private val redisUtil: RedisUtil
) {
    fun getDashboard(): Any {
        val json = redisUtil.jsonGetNoPath("total_clicks")
        val mapper = ObjectMapper()
        return mapper.readValue(json, Any::class.java)
    }
}