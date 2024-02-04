package com.kiworld.popuniv.controller;

import io.swagger.v3.oas.annotations.media.Schema;

public class ClickData {
  @Schema(description = "유저 ID", example = "3")
  private int user_id;

  @Schema(description = "클릭 개수", example = "32")
  private long clickCount;

  // 생성자, 게터(getter), 세터(setter) 생략

  // 게터(getter)와 세터(setter) 메서드를 추가하여 필드에 접근할 수 있도록 합니다.
  public int getUserId() {
      return this.user_id;
  }

  public long getClickCount() {
      return this.clickCount;
  }

  public void setClickCount(int clickCount) {
      this.clickCount = clickCount;
  }
}