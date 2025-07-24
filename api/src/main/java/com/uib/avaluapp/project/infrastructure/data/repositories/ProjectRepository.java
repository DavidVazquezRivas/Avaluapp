package com.uib.avaluapp.project.infrastructure.data.repositories;

import com.uib.avaluapp.project.infrastructure.data.models.ProjectEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {
    List<ProjectEntity> findAllByAdminId(Long adminId);

    @Query("SELECT p FROM ProjectEntity p JOIN p.questions q WHERE q.id = :questionId")
    Optional<ProjectEntity> findByQuestionId(Long questionId);
}
