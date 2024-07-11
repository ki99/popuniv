package org.example.popunivkotlin.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.connection.RedisStandaloneConfiguration
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer
import org.springframework.data.redis.serializer.StringRedisSerializer

@Configuration
class RedisConfig(
    @Value("\${spring.data.redis.host}") private val host: String,
    @Value("\${spring.data.redis.port}") private val port: Int
) {
    @Bean
    fun lettuceConnectionFactory(): LettuceConnectionFactory {
        return LettuceConnectionFactory(RedisStandaloneConfiguration(host, port))
    }

    @Bean
    fun redisTemplate(): RedisTemplate<*, *> {
        return RedisTemplate<Any, Any>().apply {
            this.connectionFactory = lettuceConnectionFactory()
            this.keySerializer = StringRedisSerializer()
            this.hashKeySerializer = StringRedisSerializer()
            this.valueSerializer = GenericJackson2JsonRedisSerializer()
            this.hashValueSerializer = GenericJackson2JsonRedisSerializer()
            this.afterPropertiesSet()
        }
    }
}