package com.uib.avaluapp.tags.infrastructure.data.repositories;

import com.uib.avaluapp.tags.infrastructure.data.models.TagEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends CrudRepository<TagEntity, Long> {
    List<TagEntity> findAllByProjectId(Long projectId);

    @Query("SELECT t FROM TagEntity t LEFT JOIN FETCH t.questions WHERE t.id = :id")
    Optional<TagEntity> findWithQuestions(Long id);
}
