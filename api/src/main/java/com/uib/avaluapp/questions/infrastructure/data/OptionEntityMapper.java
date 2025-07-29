package com.uib.avaluapp.questions.infrastructure.data;

import com.uib.avaluapp.questions.domain.models.Option;
import com.uib.avaluapp.questions.infrastructure.data.models.OptionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface OptionEntityMapper {
    OptionEntityMapper INSTANCE = Mappers.getMapper(OptionEntityMapper.class);

    OptionEntity toEntity(Option option);

    Option toDomain(OptionEntity optionEntity);

    List<Option> toDomainList(List<OptionEntity> optionEntities);
}
