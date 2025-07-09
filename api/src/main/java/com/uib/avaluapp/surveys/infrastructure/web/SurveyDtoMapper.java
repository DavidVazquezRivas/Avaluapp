package com.uib.avaluapp.surveys.infrastructure.web;

import com.uib.avaluapp.project.infrastructure.web.ProjectDtoMapper;
import com.uib.avaluapp.surveys.domain.models.Survey;
import com.uib.avaluapp.surveys.infrastructure.web.responses.SurveyDto;
import com.uib.avaluapp.user.infrastructure.web.UserDtoMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = {UserDtoMapper.class, ProjectDtoMapper.class})
public interface SurveyDtoMapper {
    SurveyDtoMapper INSTANCE = Mappers.getMapper(SurveyDtoMapper.class);

    SurveyDto toDto(Survey survey);

    List<SurveyDto> toDtoList(List<Survey> surveys);
}
