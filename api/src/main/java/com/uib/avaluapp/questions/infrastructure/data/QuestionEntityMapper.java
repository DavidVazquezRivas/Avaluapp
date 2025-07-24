package com.uib.avaluapp.questions.infrastructure.data;

import com.uib.avaluapp.project.infrastructure.data.adapters.ProjectEntityMapper;
import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.questions.infrastructure.data.models.QuestionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = {ProjectEntityMapper.class, OptionEntityMapper.class})
public interface QuestionEntityMapper {
    QuestionEntityMapper INSTANCE = Mappers.getMapper(QuestionEntityMapper.class);

    QuestionEntity toEntity(Question question);

    Question toDomain(QuestionEntity questionEntity);

    default List<Question> toDomainList(List<QuestionEntity> questionEntities) {
        return questionEntities.stream()
                .map(this::toDomain)
                .toList();
    }
}
