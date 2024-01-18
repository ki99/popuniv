package com.kiworld.popuniv.controller;

public class ClickData {
  private String group;
  private long clickCount;

  // 생성자, 게터(getter), 세터(setter) 생략

  // 게터(getter)와 세터(setter) 메서드를 추가하여 필드에 접근할 수 있도록 합니다.
  public String getGroup() {
      return group;
  }

  public void setGroup(String group) {
      this.group = group;
  }

  public long getClickCount() {
      return clickCount;
  }

  public void setClickCount(int clickCount) {
      this.clickCount = clickCount;
  }
}