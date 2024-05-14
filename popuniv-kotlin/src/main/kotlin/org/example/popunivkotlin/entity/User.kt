package org.example.popunivkotlin.entity

import jakarta.persistence.*
import org.example.popunivkotlin.common.Role

@Entity
class User (
    @Column(nullable = false, unique = true)
    val email: String,
    @Column(nullable = false)
    var password: String,
    @ManyToOne(fetch = FetchType.LAZY)
    var university: University,
    @Column(nullable = false)
    val nickname: String,
    @Enumerated(EnumType.STRING)
    val role: Role = Role.USER
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0
}