package com.kiworld.popuniv.service;

import com.kiworld.popuniv.entity.OrganizationType;
import com.kiworld.popuniv.repository.SuborganizationRepository;
import com.kiworld.popuniv.repository.UniversityRepository;



public class RepositoryService {
  public SuborganizationRepository getRepository(OrganizationType organization_type) {
    switch (organization_type) {
      case University:
        return new UniversityRepository();
      case Company:
        return new CompanyRepository();
      default:
        throw new IllegalArgumentException("지원되지 않는 OrganizationType입니다.");
    }
  }
}
