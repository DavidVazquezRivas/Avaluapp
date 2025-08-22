package com.uib.avaluapp.answer.infrastructure.web.mappers;

import com.uib.avaluapp.answer.domain.models.Answer;
import com.uib.avaluapp.answer.infrastructure.web.models.AnswerByTagResponse;
import com.uib.avaluapp.tags.domain.models.Tag;
import com.uib.avaluapp.tags.infrastructure.web.mapper.TagDtoMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(uses = {AnswerDtoMapper.class, TagDtoMapper.class})
public interface AnswerByTagMapper {
    AnswerByTagMapper INSTANCE = Mappers.getMapper(AnswerByTagMapper.class);

    @Mapping(target = "tag", source = "key")
    @Mapping(target = "answers", source = "value")
    AnswerByTagResponse toResponse(Map.Entry<Tag, List<Answer>> entry);

    default List<AnswerByTagResponse> toResponseList(Map<Tag, List<Answer>> answersByTag) {
        return answersByTag.entrySet().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}