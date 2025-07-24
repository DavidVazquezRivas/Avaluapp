package com.uib.avaluapp.questions.infrastructure.web;

import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.questions.infrastructure.web.responses.CompleteQuestionDto;
import com.uib.avaluapp.questions.infrastructure.web.responses.QuestionDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = {OptionDtoMapper.class})
public interface QuestionDtoMapper {
    QuestionDtoMapper INSTANCE = Mappers.getMapper(QuestionDtoMapper.class);

    QuestionDto toDto(Question question);

    CompleteQuestionDto toCompleteDto(Question question);

    List<QuestionDto> toDtoList(List<Question> question);
}
