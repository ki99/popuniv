package com.kiworld.popuniv.entity;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "유저가 속한 조직 정보")
public class UserOrganizations {
  @Id //Primary key
	//프로젝트에서 연결된db의 넘버링 전략을 따라간다.  -> 오라클이나 mysql에 따라 바뀐다는 뜻이다.
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int id; // 시퀀스, auto_increment

  @Column(nullable = false)
  @Schema(description = "유저의 아이디", nullable = false, example = "4")
  private int user_id;

  @Column(nullable = false, length = 100)
  @Schema(description = "유저가 속한 조직의 타입(테이블의 이름)을 저장", nullable = false, example = "University")
  private OrganizationType organization_type; 

  @Column(nullable = false, length = 100)
  @Schema(description = "organization_type의 값을 이름으로 가지는 테이블의, 유저가 속한 조직의 name을 가지는 row의 id를 저장", nullable = false, example = "3")
  private int organization_id; // 조직의 아이디
}
