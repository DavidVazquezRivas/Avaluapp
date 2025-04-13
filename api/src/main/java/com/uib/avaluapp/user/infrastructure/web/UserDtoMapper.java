package com.uib.avaluapp.user.infrastructure.web;

import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.infrastructure.web.responses.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UserDtoMapper {
    UserDtoMapper INSTANCE = Mappers.getMapper(UserDtoMapper.class);

    UserDto toDto(User user);

    List<UserDto> toDtoList(List<User> users);
}
