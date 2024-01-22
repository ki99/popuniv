package com.kiworld.popuniv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity //User 클래스가 스프링이 시작할 때, MySQL에 테이블을 생성한다.
@Getter
@Setter
public class User {
	
	@Id //Primary key
	//프로젝트에서 연결된db의 넘버링 전략을 따라간다.  -> 오라클이나 mysql에 따라 바뀐다는 뜻이다.
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int id; // 시퀀스, auto_increment
	
	
	@Column(nullable = false, length = 30)
	private String username; // 아이디
	
	@Column(nullable = false, length = 100) // -> 비밀번호를 암호화 하기위해서 해쉬를 사용해야 한다.
	private String password;
	
	
	@Column(nullable = false, length = 50)
	private String email;
  // make role column
  @Enumerated(EnumType.STRING)
  private UserType role; // Enum을 쓰는게 좋다. // ADMIN, USER
  
}