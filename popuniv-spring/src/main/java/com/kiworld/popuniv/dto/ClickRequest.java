package com.kiworld.popuniv.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class ClickRequest {

  @Schema(description = "클릭 개수", example = "33")
  private long clickCount;

}