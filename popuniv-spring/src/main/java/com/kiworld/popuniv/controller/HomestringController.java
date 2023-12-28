package com.kiworld.popuniv.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomestringController {
  
  @GetMapping("/homestring")
  @ResponseBody
  @CrossOrigin
  public String homeString() {
      return "homestring succeed";
  }
}
