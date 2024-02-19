package com.kiworld.popuniv.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DashboardResponse {
    private int key;
    private long value;
  
    public DashboardResponse(int key, long value) {
      this.key = key;
      this.value = value;
    }
  }