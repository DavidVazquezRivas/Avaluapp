package com.uib.avaluapp.tags.domain.ports;

import com.uib.avaluapp.tags.domain.models.Tag;

import java.util.List;

public interface TagPort {
    Tag getTagById(Long id);

    List<Tag> getAllTagsByProjectId(Long projectId);

    Tag createTag(Tag tag);

    Tag updateTag(Tag tag);

    void deleteTag(Long id);
}
