package com.kiworld.popuniv.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class ClickResponse {

    @Schema(description = "해당 유저의 클릭 개수", example = "33")
    private long userClickCount;

    @Schema(description = "모든 유저의 클릭 개수", example = "333")
    private long allClickCount;
}