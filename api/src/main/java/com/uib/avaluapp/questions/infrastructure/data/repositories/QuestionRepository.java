package com.uib.avaluapp.questions.infrastructure.data.repositories;

import com.uib.avaluapp.questions.infrastructure.data.models.QuestionEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends CrudRepository<QuestionEntity, Long> {
    @Query("SELECT q FROM QuestionEntity q LEFT JOIN FETCH q.options WHERE q.id = :id")
    Optional<QuestionEntity> findWithOptions(@Param("id") Long id);

    List<QuestionEntity> findAllByProjectId(Long projectId);

    @Query("SELECT q FROM QuestionEntity q LEFT JOIN FETCH q.tags t WHERE t.id = :tagId")
    List<QuestionEntity> findAllByTagId(Long tagId);
}
