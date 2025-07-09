package com.uib.avaluapp.surveys.infrastructure.data.adapters;

import com.uib.avaluapp.project.infrastructure.data.adapters.ProjectEntityMapper;
import com.uib.avaluapp.surveys.domain.models.Survey;
import com.uib.avaluapp.surveys.infrastructure.data.models.SurveyEntity;
import com.uib.avaluapp.user.infrastructure.data.adapters.UserEntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = {UserEntityMapper.class, ProjectEntityMapper.class})
public interface SurveyEntityMapper {
    SurveyEntityMapper INSTANCE = Mappers.getMapper(SurveyEntityMapper.class);

    SurveyEntity toEntity(Survey survey);

    Survey toDomain(SurveyEntity surveyEntity);

    default List<Survey> toDomainList(List<SurveyEntity> surveyEntities) {
        return surveyEntities.stream()
                .map(this::toDomain)
                .toList();
    }
}
