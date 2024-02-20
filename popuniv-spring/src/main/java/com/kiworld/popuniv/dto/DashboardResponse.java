package com.kiworld.popuniv.dto;

import com.kiworld.popuniv.entity.Group;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DashboardResponse {
    private Group group;
    private long value;
  
    public DashboardResponse(Group group, long value) {
      this.group = group;
      this.value = value;
    }
  }