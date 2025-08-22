package com.uib.avaluapp.answer.infrastructure.data.adapters;

import com.uib.avaluapp.answer.domain.models.Answer;
import com.uib.avaluapp.answer.infrastructure.data.models.AnswerEntity;
import com.uib.avaluapp.questions.infrastructure.data.QuestionEntityMapper;
import com.uib.avaluapp.surveys.infrastructure.data.adapters.SurveyEntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = {SurveyEntityMapper.class, QuestionEntityMapper.class})
public interface AnswerEntityMapper {
    AnswerEntityMapper INSTANCE = Mappers.getMapper(AnswerEntityMapper.class);

    AnswerEntity toEntity(Answer answer);

    Answer toDomain(AnswerEntity answerEntity);

    List<AnswerEntity> toEntityList(List<Answer> answers);
    
    List<Answer> toDomainList(List<AnswerEntity> answerEntities);
}
