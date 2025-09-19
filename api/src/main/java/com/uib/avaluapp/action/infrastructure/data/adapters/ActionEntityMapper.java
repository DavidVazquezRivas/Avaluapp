package com.uib.avaluapp.action.infrastructure.data.adapters;

import com.uib.avaluapp.action.domain.models.Action;
import com.uib.avaluapp.action.infrastructure.data.models.ActionEntity;
import com.uib.avaluapp.user.infrastructure.data.adapters.UserEntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = {UserEntityMapper.class})
public interface ActionEntityMapper {
    ActionEntityMapper INSTANCE = Mappers.getMapper(ActionEntityMapper.class);

    @Mapping(target = "id", ignore = true)
    ActionEntity toEntity(Action action);

    Action toDomain(ActionEntity actionEntity);

    List<ActionEntity> toEntityList(List<Action> actions);

    List<Action> toDomainList(List<ActionEntity> actionEntities);
}
