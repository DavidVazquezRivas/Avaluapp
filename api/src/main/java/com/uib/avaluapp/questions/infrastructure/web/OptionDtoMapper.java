package com.uib.avaluapp.questions.infrastructure.web;

import com.uib.avaluapp.questions.domain.models.Option;
import com.uib.avaluapp.questions.infrastructure.web.requests.CreateOptionRequest;
import com.uib.avaluapp.questions.infrastructure.web.requests.UpdateOptionRequest;
import com.uib.avaluapp.questions.infrastructure.web.responses.OptionDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface OptionDtoMapper {
    OptionDtoMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(OptionDtoMapper.class);

    OptionDto toDto(Option option);

    Option toDomain(OptionDto optionDto);

    Option toDomain(CreateOptionRequest createOptionRequest);

    Option toDomain(UpdateOptionRequest updateOptionRequest);

    List<Option> toDomainListFromCreate(List<CreateOptionRequest> createOptionRequests);

    List<Option> toDomainListFromUpdate(List<UpdateOptionRequest> updateOptionRequests);

    List<OptionDto> toDtoList(List<Option> options);
}
