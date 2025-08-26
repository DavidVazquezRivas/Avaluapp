package com.uib.avaluapp.answer.infrastructure.data.repositories;

import com.uib.avaluapp.answer.infrastructure.data.models.AnswerEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AnswerRepository extends CrudRepository<AnswerEntity, Long> {
    @Query("SELECT a FROM AnswerEntity a LEFT JOIN FETCH a.survey s LEFT JOIN FETCH a.question q WHERE s.project.id =:projectId")
    List<AnswerEntity> findAllByProjectId(Long projectId);

    List<AnswerEntity> findAllBySurveyId(Long surveyId);

    @Query("""
                SELECT a
                FROM AnswerEntity a
                JOIN a.survey s
                JOIN s.tag t
                WHERE t.id IN :tagIds
            """)
    List<AnswerEntity> findAllByTagIds(List<Long> tagIds);

}
