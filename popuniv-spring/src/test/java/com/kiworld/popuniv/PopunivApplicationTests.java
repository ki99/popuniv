package com.kiworld.popuniv;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.kiworld.popuniv.entity.University;
import com.kiworld.popuniv.repository.UniversityRepository;
import java.util.List;

@SpringBootTest
class PopunivApplicationTests {

  @Autowired
  private UniversityRepository universityRepository;

	@Test
	void contextLoads() {
	}

}
