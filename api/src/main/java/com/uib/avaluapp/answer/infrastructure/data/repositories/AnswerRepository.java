package com.uib.avaluapp.answer.infrastructure.data.repositories;

import com.uib.avaluapp.answer.infrastructure.data.models.AnswerEntity;
import org.springframework.data.repository.CrudRepository;

public interface AnswerRepository extends CrudRepository<AnswerEntity, Long> {
    
}
