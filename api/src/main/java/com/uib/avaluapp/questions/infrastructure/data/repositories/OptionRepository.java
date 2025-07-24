package com.uib.avaluapp.questions.infrastructure.data.repositories;

import com.uib.avaluapp.questions.infrastructure.data.models.OptionEntity;
import org.springframework.data.repository.CrudRepository;

public interface OptionRepository extends CrudRepository<OptionEntity, Long> {
}
