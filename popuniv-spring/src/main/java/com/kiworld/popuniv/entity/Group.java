package com.kiworld.popuniv.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "group_table")
@Getter
@Setter
@Schema( description = "회사정보")
public class Group {
    @Id //Primary key
    //프로젝트에서 연결된db의 넘버링 전략을 따라간다.  -> 오라클이나 mysql에 따라 바뀐다는 뜻이다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private int id; // 시퀀스, auto_increment

    @Column(nullable = false, length = 100, unique = true)
    @Schema(description = "Group 이름", nullable = false, example = "Ringle")
    private String name; // group 이름

    @Column(nullable = false, length = 100)
    @Enumerated(EnumType.STRING)
    @Schema(description = "Group 타입", nullable = false, example = "Company")
    private GroupType type; // group 타입
}
