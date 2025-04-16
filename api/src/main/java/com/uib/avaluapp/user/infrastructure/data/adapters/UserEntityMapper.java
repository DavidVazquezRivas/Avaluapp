package com.uib.avaluapp.user.infrastructure.data.adapters;

import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.infrastructure.data.models.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserEntityMapper {
    UserEntityMapper INSTANCE = Mappers.getMapper(UserEntityMapper.class);

    UserEntity toEntity(User user);

    User toDomain(UserEntity userEntity);
}
