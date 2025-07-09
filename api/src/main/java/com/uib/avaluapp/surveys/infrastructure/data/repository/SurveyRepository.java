package com.uib.avaluapp.surveys.infrastructure.data.repository;

import com.uib.avaluapp.surveys.infrastructure.data.models.SurveyEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SurveyRepository extends CrudRepository<SurveyEntity, Long> {
    @Query("SELECT s FROM SurveyEntity s LEFT JOIN FETCH s.lead WHERE s.id = :id")
    Optional<SurveyEntity> findWithLead(@Param("id") Long id);

    @Query("SELECT s FROM SurveyEntity s LEFT JOIN FETCH s.project WHERE s.id = :id")
    Optional<SurveyEntity> findWithProject(@Param("id") Long id);

    List<SurveyEntity> findAllByProjectId(Long projectId);
}
