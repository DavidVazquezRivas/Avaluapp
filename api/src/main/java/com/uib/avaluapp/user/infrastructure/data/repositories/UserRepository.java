package com.uib.avaluapp.user.infrastructure.data.repositories;

import com.uib.avaluapp.user.infrastructure.data.models.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);

    int countByCreatedBy(Long creatorId);
}
