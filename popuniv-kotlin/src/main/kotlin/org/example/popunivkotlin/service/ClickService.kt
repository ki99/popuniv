package org.example.popunivkotlin.service

import org.example.popunivkotlin.dto.ClickRequest
import org.example.popunivkotlin.dto.ClickResponse
import org.example.popunivkotlin.entity.University
import org.example.popunivkotlin.repository.UniversityRepository
import org.example.popunivkotlin.repository.UserRepository
import org.example.popunivkotlin.util.RedisUtil
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Service

@Service
class ClickService (
    private val redisUtil: RedisUtil,
    private val userRepository: UserRepository,
    private val universityRepository: UniversityRepository
) {
    // using universityId, get value of key "user:userId_univ:universityId" from redis, and also get value of key "total_clicks" with path $.universityId from redis
    fun getClicks(user: User?, universityId: Long): ClickResponse {
        val userId = user?.let { userRepository.findByEmail(it.username)?.id } ?: 1L
        val userClicks = redisUtil.get("user:${userId}_univ:$universityId").toString()
        val university : University = universityRepository.findById(universityId).get()
        val path = university.name.replace("\"", "\\\"")
        val totalClicks: String? = redisUtil.jsonGet("total_clicks", "['$path']")
        return ClickResponse(
            userClicks.toLong(), totalClicks!!.trim('"').toLong()
        )
    }

    fun click(user: User?, universityId: Long, requestBody: ClickRequest): ClickResponse {
        val userId = user?.let { userRepository.findByEmail(it.username)?.id } ?: 1L
        val university : University = universityRepository.findById(universityId).get()
        val clickCount = requestBody.clickCount

        val key = "user:${userId}_univ:$universityId"
        val incrRet = redisUtil.incr(key, clickCount).toString()
        val totalKey = "total_clicks"
        val totalPath = university.name.replace("\"", "\\\"")

        val jsonIncrRet = redisUtil.jsonIncr(totalKey, "['$totalPath']", clickCount)
        return ClickResponse(
            incrRet.toLong(), jsonIncrRet!!.toLong()
        )
    }
}