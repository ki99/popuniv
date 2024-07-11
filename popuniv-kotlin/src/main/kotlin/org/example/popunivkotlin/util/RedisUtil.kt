package org.example.popunivkotlin.util

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Component

@Component
class RedisUtil(private val redisTemplate: RedisTemplate<String, Any>) {

    fun get(key: String): Any? = redisTemplate.opsForValue().get(key)

    fun set(key: String, value: Any) = redisTemplate.opsForValue().set(key, value)

    fun incr(key: String, value: Long): Long? = redisTemplate.opsForValue().increment(key, value)

    fun hasKey(key: String): Boolean = redisTemplate.hasKey(key)

    fun jsonSet(key: String, path: String, value: Any) {
        val mapper = jacksonObjectMapper()
        val jsonValue = mapper.writeValueAsString(value)
        redisTemplate.execute { connection ->
            connection.execute("JSON.SET", key.toByteArray(), path.toByteArray(), jsonValue.toString().toByteArray()) }
    }

    fun jsonGetNoPath(key: String): String? {
        return redisTemplate.execute { connection ->
            connection.execute("JSON.GET", key.toByteArray())
        }?.let { String(it as ByteArray)}
    }

    fun jsonGet(key: String, path: String): String? {
        return redisTemplate.execute { connection ->
            connection.execute("JSON.GET", key.toByteArray(), path.toByteArray())
        }?.let { String(it as ByteArray) }
    }

    fun jsonIncr(key: String, path: String, value: Long) : String? {
        return redisTemplate.execute { connection ->
            connection.execute("JSON.NUMINCRBY", key.toByteArray(), path.toByteArray(), value.toString().toByteArray())
        }?.let { String(it as ByteArray) }
    }
}