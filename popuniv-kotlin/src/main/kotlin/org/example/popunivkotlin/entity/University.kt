package org.example.popunivkotlin.entity

import jakarta.persistence.*

@Entity
class University (
    @Column(nullable = false, unique = true)
    var name: String
) {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0

}