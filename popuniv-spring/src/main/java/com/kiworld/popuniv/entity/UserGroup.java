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
public class UserGroup {
    // user가 속한 group을 연결해주는 테이블
    @Id //Primary key
    //프로젝트에서 연결된db의 넘버링 전략을 따라간다.  -> 오라클이나 mysql에 따라 바뀐다는 뜻이다.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // 시퀀스, auto_increment

    @Column(nullable = false)
    @Schema(description = "유저 id", nullable = false, example = "1")
    private long userId; // user id

    @Column(nullable = false)
    @Schema(description = "그룹 id", nullable = false, example = "1")
    private int groupId; // group id
}
