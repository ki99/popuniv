package com.kiworld.popuniv.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class ClickData {

  @Schema(description = "클릭 개수", example = "33")
  private long clickCount;

  @Schema(description = "유저 ID", example = "3")
  private int userId;


}