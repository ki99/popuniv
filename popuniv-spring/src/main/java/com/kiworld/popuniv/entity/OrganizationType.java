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
@Schema(description = "Organization Type 정보")
public class OrganizationType{
  @Id //Primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int id; // 시퀀스, auto_increment

  @Column(nullable = false, length = 100, unique = true)
  @Schema(description = "조직의 타입 이름", nullable = false, example = "University")
  private String type_name;
}
