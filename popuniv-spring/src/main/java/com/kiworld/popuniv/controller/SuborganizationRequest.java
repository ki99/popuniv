package com.kiworld.popuniv.controller;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuborganizationRequest {

    @Schema(description = "이름", example = "Ringle")
    private String name;

    // 생성자, 게터(getter), 세터(setter) 생략

    // 게터(getter)와 세터(setter) 메서드를 추가하여 필드에 접근할 수 있도록 합니다.
}
