package com.uib.avaluapp.action.infrastructure.data.repositories;

import com.uib.avaluapp.action.infrastructure.data.models.ActionEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface ActionRepository extends CrudRepository<ActionEntity, Long> {
    @Query("SELECT a FROM ActionEntity a WHERE a.user.id = :userId ORDER BY a.timestamp DESC LIMIT 50")
    List<ActionEntity> findByUserId(Long userId);
}
