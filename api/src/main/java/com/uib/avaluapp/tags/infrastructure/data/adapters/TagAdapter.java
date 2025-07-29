package com.uib.avaluapp.tags.infrastructure.data.adapters;


import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.questions.infrastructure.data.models.QuestionEntity;
import com.uib.avaluapp.questions.infrastructure.data.repositories.QuestionRepository;
import com.uib.avaluapp.tags.domain.models.Tag;
import com.uib.avaluapp.tags.domain.ports.TagPort;
import com.uib.avaluapp.tags.infrastructure.data.models.TagEntity;
import com.uib.avaluapp.tags.infrastructure.data.repositories.TagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TagAdapter implements TagPort {

    private final TagRepository tagRepository;
    private final QuestionRepository questionRepository;

    @Override
    public Tag getTagById(Long id) {
        return tagRepository.findWithQuestions(id)
                .map(TagEntityMapper.INSTANCE::toDomain)
                .orElseThrow(() -> new BaseException(ExceptionCode.TAG_NOT_FOUND));
    }

    @Override
    public List<Tag> getAllTagsByProjectId(Long projectId) {
        List<TagEntity> tagEntities = tagRepository.findAllByProjectId(projectId);

        return TagEntityMapper.INSTANCE.toDomainList(tagEntities);
    }

    @Override
    @Transactional
    public Tag createTag(Tag tag) {
        TagEntity tagEntity = TagEntityMapper.INSTANCE.toEntity(tag);

        List<QuestionEntity> associatedQuestions = tag.getQuestions().stream()
                .map(q -> questionRepository.findById(q.getId())
                        .orElseThrow(() -> new BaseException(ExceptionCode.QUESTION_NOT_FOUND)))
                .toList();

        TagEntity savedEntity = tagRepository.save(tagEntity);

        // Establish the bidirectional relationship using the helper method
        for (QuestionEntity question : associatedQuestions) {
            tagEntity.addQuestion(question);
            questionRepository.save(question);
        }


        return TagEntityMapper.INSTANCE.toDomain(savedEntity);
    }

    @Override
    @Transactional
    public Tag updateTag(Tag tag) {
        TagEntity existingTag = tagRepository.findById(tag.getId())
                .orElseThrow(() -> new BaseException(ExceptionCode.TAG_NOT_FOUND));

        for (QuestionEntity question : existingTag.getQuestions()) {
            question.removeTag(existingTag);
            questionRepository.save(question);
        }

        tag.getQuestions().stream()
                .map(q -> questionRepository.findById(q.getId())
                        .orElseThrow(() -> new BaseException(ExceptionCode.QUESTION_NOT_FOUND)))
                .forEach(existingTag::addQuestion);

        TagEntity entity = tagRepository.save(TagEntityMapper.INSTANCE.toEntity(tag));
        return TagEntityMapper.INSTANCE.toDomain(entity);
    }

    @Override
    @Transactional
    public void deleteTag(Long id) {
        TagEntity tag = tagRepository.findById(id)
                .orElseThrow(() -> new BaseException(ExceptionCode.TAG_NOT_FOUND));

        for (QuestionEntity question : questionRepository.findAllByTagId(id)) {
            question.removeTag(tag);
            questionRepository.save(question);
        }

        tagRepository.deleteById(id);
    }
}
