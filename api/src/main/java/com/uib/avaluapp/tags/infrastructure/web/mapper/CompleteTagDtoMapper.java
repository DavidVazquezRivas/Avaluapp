package com.uib.avaluapp.tags.infrastructure.web.mapper;

import com.uib.avaluapp.questions.infrastructure.web.QuestionDtoMapper;
import com.uib.avaluapp.tags.domain.models.Tag;
import com.uib.avaluapp.tags.infrastructure.web.responses.CompleteTagDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {QuestionDtoMapper.class})
public interface CompleteTagDtoMapper {
    CompleteTagDtoMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(CompleteTagDtoMapper.class);

    CompleteTagDto toCompleteDto(Tag tag);

    Tag toDomain(CompleteTagDto completeTagDto);

    List<CompleteTagDto> toCompleteDtoList(List<Tag> tags);
}
