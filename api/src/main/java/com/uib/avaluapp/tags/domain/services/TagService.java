package com.uib.avaluapp.tags.domain.services;

import com.uib.avaluapp.tags.infrastructure.web.requests.CreateTagRequest;
import com.uib.avaluapp.tags.infrastructure.web.responses.CompleteTagDto;
import com.uib.avaluapp.tags.infrastructure.web.responses.TagDto;

import java.util.List;

public interface TagService {
    CompleteTagDto getTagById(String authorization, Long id);

    List<TagDto> getAllTags(String authorization, Long projectId);

    CompleteTagDto createTag(String authorization, CreateTagRequest request);

    CompleteTagDto updateTag(String authorization, Long id, CreateTagRequest request);

    void deleteTag(String authorization, Long id);
}
