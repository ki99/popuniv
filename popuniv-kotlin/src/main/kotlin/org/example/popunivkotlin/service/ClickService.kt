package org.example.popunivkotlin.service

import org.example.popunivkotlin.dto.ClickRequest
import org.example.popunivkotlin.dto.ClickResponse
import org.example.popunivkotlin.repository.UserRepository
import org.example.popunivkotlin.util.RedisUtil
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Service

@Service
class ClickService (
    private val redisUtil: RedisUtil,
    private val userRepository: UserRepository
) {
    // using universityId, get value of key "user:userId_univ:universityId" from redis, and also get value of key "total_clicks" with path $.universityId from redis
    fun getClicks(user: User, universityId: Long): ClickResponse {
        val userId = userRepository.findByEmail(user.username)!!.id
        val userClicks = redisUtil.get("user:${userId}_univ:$universityId").toString()

        val totalClicks: String? = redisUtil.jsonGet("total_clicks", ".univ_$universityId")
        return ClickResponse(
            userClicks.toLong(), totalClicks!!.trim('"').toLong()
        )
    }

    fun click(user: User, universityId: Long, requestBody: ClickRequest): ClickResponse {
        val netUser = userRepository.findByEmail(user.username)
        val clickCount = requestBody.clickCount

        val key = "user:${netUser!!.id}_univ:$universityId"
        val incrRet = redisUtil.incr(key, clickCount).toString()
        val totalKey = "total_clicks"
        val totalPath = "$.univ_$universityId"
        println("totalPath: $totalPath")

        val jsonIncrRet = redisUtil.jsonIncr(totalKey, totalPath, clickCount)
        val len = jsonIncrRet!!.length
        return ClickResponse(
            incrRet.toLong(), jsonIncrRet.substring(1, len - 1).toLong()
        )
    }
}