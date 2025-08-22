package com.uib.avaluapp.answer.infrastructure.web.mappers;

import com.uib.avaluapp.answer.domain.models.Answer;
import com.uib.avaluapp.answer.infrastructure.web.models.AnswerBySurveyResponse;
import com.uib.avaluapp.surveys.domain.models.Survey;
import com.uib.avaluapp.surveys.infrastructure.web.SurveyDtoMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(uses = {AnswerDtoMapper.class, SurveyDtoMapper.class})
public interface AnswerBySurveyMapper {
    AnswerBySurveyMapper INSTANCE = Mappers.getMapper(AnswerBySurveyMapper.class);

    @Mapping(target = "survey", source = "key")
    @Mapping(target = "answers", source = "value")
    AnswerBySurveyResponse toResponse(Map.Entry<Survey, List<Answer>> entry);

    default List<AnswerBySurveyResponse> toResponseList(Map<Survey, List<Answer>> answersBySurvey) {
        return answersBySurvey.entrySet().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}
