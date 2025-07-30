package com.uib.avaluapp.questions.infrastructure.data;

import com.uib.avaluapp.project.infrastructure.data.adapters.ProjectEntityMapper;
import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.questions.infrastructure.data.models.QuestionEntity;
import com.uib.avaluapp.tags.domain.models.Tag;
import com.uib.avaluapp.tags.infrastructure.data.adapters.TagEntityMapper;
import com.uib.avaluapp.tags.infrastructure.data.models.TagEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = {ProjectEntityMapper.class, OptionEntityMapper.class})
public interface QuestionEntityMapper {
    QuestionEntityMapper INSTANCE = Mappers.getMapper(QuestionEntityMapper.class);

    QuestionEntity toEntity(Question question);

    // Mapeo completo: Question CON sus tags (pero esos tags SIN questions)
    @Mapping(target = "tags", qualifiedByName = "mapTagsWithoutQuestions")
    Question toDomain(QuestionEntity questionEntity);

    // Mapeo sin tags: Question SIN tags
    @Named("mapQuestionWithoutTags")
    @Mapping(target = "tags", ignore = true)
    Question mapQuestionWithoutTags(QuestionEntity questionEntity);

    // Mapea tags SIN sus questions (evita recursión)
    @Named("mapTagsWithoutQuestions")
    default List<Tag> mapTagsWithoutQuestions(List<TagEntity> tagEntities) {
        if (tagEntities == null) return null;
        return tagEntities.stream()
                .map(tagEntity -> TagEntityMapper.INSTANCE.mapTagWithoutQuestions(tagEntity))
                .toList();
    }

    default List<Question> toDomainList(List<QuestionEntity> questionEntities) {
        if (questionEntities == null) return null;
        return questionEntities.stream()
                .map(this::toDomain)
                .toList();
    }
}