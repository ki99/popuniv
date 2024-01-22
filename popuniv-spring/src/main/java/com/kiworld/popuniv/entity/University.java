package com.kiworld.popuniv.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class University {
  // make university entity
  @Id //Primary key
	//프로젝트에서 연결된db의 넘버링 전략을 따라간다.  -> 오라클이나 mysql에 따라 바뀐다는 뜻이다.
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int id; // 시퀀스, auto_increment

  @Column(nullable = false, length = 100, unique = true)
  private String name; // 대학교 이름
}
