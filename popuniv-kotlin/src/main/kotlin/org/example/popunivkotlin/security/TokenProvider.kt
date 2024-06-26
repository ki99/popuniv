package org.example.popunivkotlin.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.stereotype.Service
import java.sql.Timestamp
import java.time.Instant
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit
import java.util.*
import javax.crypto.spec.SecretKeySpec

@PropertySource("classpath:jwt.yml")
@Service
class TokenProvider(
    @Value("\${secret-key}")
    private val secretKey: String,
    @Value("\${expiration-hours}")
    private val expirationHours: String
) {
    fun createToken(email: String) = Jwts.builder()
        .signWith(SecretKeySpec(secretKey.toByteArray(), SignatureAlgorithm.HS512.jcaName))
        .setSubject(email)
        .setIssuedAt(Timestamp.valueOf(LocalDateTime.now()))
        .setExpiration(Date.from(Instant.now().plus(expirationHours.toLong(), ChronoUnit.HOURS)))
        .compact()!!

    fun validateTokenAndGetSubject(token: String?): String? = Jwts.parserBuilder()
        .setSigningKey(secretKey.toByteArray())
        .build()
        .parseClaimsJws(token)
        .body
        .subject
}