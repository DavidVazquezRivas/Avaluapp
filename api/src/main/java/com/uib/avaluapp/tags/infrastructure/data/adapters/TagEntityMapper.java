package com.uib.avaluapp.tags.infrastructure.data.adapters;

import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.questions.infrastructure.data.QuestionEntityMapper;
import com.uib.avaluapp.questions.infrastructure.data.models.QuestionEntity;
import com.uib.avaluapp.surveys.infrastructure.data.adapters.SurveyEntityMapper;
import com.uib.avaluapp.tags.domain.models.Tag;
import com.uib.avaluapp.tags.infrastructure.data.models.TagEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = {SurveyEntityMapper.class})
public interface TagEntityMapper {
    TagEntityMapper INSTANCE = Mappers.getMapper(TagEntityMapper.class);

    TagEntity toEntity(Tag tag);

    // Mapeo completo: Tag CON sus questions (pero esas questions SIN tags)
    @Mapping(target = "questions", qualifiedByName = "mapQuestionsWithoutTags")
    Tag toDomain(TagEntity tagEntity);

    // Mapeo sin questions: Tag SIN questions
    @Named("mapTagWithoutQuestions")
    @Mapping(target = "questions", ignore = true)
    Tag mapTagWithoutQuestions(TagEntity tagEntity);

    // Lista de tags sin questions
    @Named("mapTagsWithoutQuestions")
    default List<Tag> mapTagsWithoutQuestions(List<TagEntity> tagEntities) {
        if (tagEntities == null) return null;
        return tagEntities.stream()
                .map(this::mapTagWithoutQuestions)
                .toList();
    }

    // Mapea questions SIN sus tags (evita recursión)
    @Named("mapQuestionsWithoutTags")
    default List<Question> mapQuestionsWithoutTags(List<QuestionEntity> questionEntities) {
        if (questionEntities == null) return null;
        return questionEntities.stream()
                .map(QuestionEntityMapper.INSTANCE::mapQuestionWithoutTags)
                .toList();
    }

    default List<Tag> toDomainList(List<TagEntity> tagEntities) {
        if (tagEntities == null) return null;
        return tagEntities.stream()
                .map(this::toDomain)
                .toList();
    }
}