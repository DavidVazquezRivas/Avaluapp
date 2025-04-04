package com.uib.avaluapp.user.infrastructure.data.repositories;

import com.uib.avaluapp.user.infrastructure.data.models.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Long> {

}
