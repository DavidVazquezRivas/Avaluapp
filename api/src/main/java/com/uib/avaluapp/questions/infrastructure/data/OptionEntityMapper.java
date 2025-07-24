package com.uib.avaluapp.questions.infrastructure.data;

import com.uib.avaluapp.questions.domain.models.Option;
import com.uib.avaluapp.questions.infrastructure.data.models.OptionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OptionEntityMapper {
    OptionEntityMapper INSTANCE = Mappers.getMapper(OptionEntityMapper.class);

    OptionEntity toEntity(Option option);

    @Mapping(target = "question", ignore = true)
    Option toDomain(OptionEntity optionEntity);
}
