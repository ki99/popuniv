package com.kiworld.popuniv.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Schema(description = "유저 정보")
public class User {
	
	@Id //Primary key
	//프로젝트에서 연결된db의 넘버링 전략을 따라간다.  -> 오라클이나 mysql에 따라 바뀐다는 뜻이다.
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private long id; // 시퀀스, auto_increment
	
	
	@Column(nullable = false, length = 30)
    @Schema(description = "사용자 이름", nullable = false, example = "ki99")
	private String loginId; // 아이디
	
	@Column(nullable = false, length = 100) // -> 비밀번호를 암호화 하기위해서 해쉬를 사용해야 한다.
    @Schema(description = "사용자 비밀번호", nullable = false, example = "1q2w3e4r!")
	private String password;
	
	@Schema(description = "사용자 이메일", nullable = false, example = "qldntdma87@kaist.ac.kr")
	@Column(nullable = false, length = 50)
	private String email;

    // make nickname column
    @Column(nullable = false, length = 30)
    @Schema(description = "사용자 닉네임", nullable = false, example = "ki99")
    private String nickname; // 닉네임
    
    // make role column
    @Enumerated(EnumType.STRING)
    @Schema(description = "사용자 역할. USER, ADMIN 중 하나", nullable = false, example = "USER")
    private Role role; // Enum을 쓰는게 좋다. // ADMIN, USER
}