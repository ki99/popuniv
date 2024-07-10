package org.example.popunivkotlin.util

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Component

@Component
class RedisUtil(private val redisTemplate: RedisTemplate<String, Any>) {

    fun jsonSet(key: String, path: String, value: Any) {
        val mapper = jacksonObjectMapper()
        val jsonValue = mapper.writeValueAsString(value)
        redisTemplate.execute { connection ->
            connection.execute("JSON.SET", key.toByteArray(), path.toByteArray(), jsonValue.toString().toByteArray()) }
    }
}