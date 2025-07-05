package com.uib.avaluapp.project.infrastructure.data.repositories;

import com.uib.avaluapp.project.infrastructure.data.models.ProjectEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {
    List<ProjectEntity> findAllByAdminId(Long adminId);
}
