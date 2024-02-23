package com.kiworld.popuniv.dto;

import com.kiworld.popuniv.entity.Group;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DashboardResponse {
    private String group_name;
    private long value;
  
    public DashboardResponse(String group_name, long value) {
      this.group_name = group_name;
      this.value = value;
    }
  }