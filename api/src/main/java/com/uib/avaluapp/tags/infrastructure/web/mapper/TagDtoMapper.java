package com.uib.avaluapp.tags.infrastructure.web.mapper;

import com.uib.avaluapp.tags.domain.models.Tag;
import com.uib.avaluapp.tags.infrastructure.web.responses.CompleteTagDto;
import com.uib.avaluapp.tags.infrastructure.web.responses.TagDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface TagDtoMapper {
    TagDtoMapper INSTANCE = Mappers.getMapper(TagDtoMapper.class);

    Tag toDomain(CompleteTagDto completeTagDto);

    TagDto toDto(Tag tag);

    List<TagDto> toDtoList(List<Tag> tags);
}
