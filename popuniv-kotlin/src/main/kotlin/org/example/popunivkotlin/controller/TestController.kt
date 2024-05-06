package org.example.popunivkotlin.controller

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/test")
class TestController {

    @RequestMapping("")
    fun test() : String {
        return "test succeed"
    }
}