package com.uib.avaluapp.questions.infrastructure.data.adapters;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.questions.domain.ports.QuestionPort;
import com.uib.avaluapp.questions.infrastructure.data.OptionEntityMapper;
import com.uib.avaluapp.questions.infrastructure.data.QuestionEntityMapper;
import com.uib.avaluapp.questions.infrastructure.data.models.OptionEntity;
import com.uib.avaluapp.questions.infrastructure.data.models.QuestionEntity;
import com.uib.avaluapp.questions.infrastructure.data.repositories.QuestionRepository;
import com.uib.avaluapp.tags.infrastructure.data.models.TagEntity;
import com.uib.avaluapp.tags.infrastructure.data.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class QuestionAdapter implements QuestionPort {

    private final QuestionRepository questionRepository;
    private final TagRepository tagRepository;

    @Autowired
    public QuestionAdapter(QuestionRepository questionRepository, TagRepository tagRepository) {
        this.questionRepository = questionRepository;
        this.tagRepository = tagRepository;
    }

    @Override
    public Question fetchOptions(Question question) {
        return questionRepository.findWithOptions(question.getId())
                .map(QuestionEntityMapper.INSTANCE::toDomain)
                .orElseThrow(() -> new BaseException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    @Override
    public List<Question> getAllByProjectId(Long projectId) {
        List<QuestionEntity> entities = questionRepository.findAllByProjectId(projectId);
        return QuestionEntityMapper.INSTANCE.toDomainList(entities);
    }

    @Override
    public List<Question> getAllByTagId(Long tagId) {
        List<QuestionEntity> entities = questionRepository.findAllByTagId(tagId);
        return QuestionEntityMapper.INSTANCE.toDomainList(entities);
    }

    @Override
    public Question getQuestionById(Long questionId) {
        return questionRepository.findById(questionId)
                .map(QuestionEntityMapper.INSTANCE::toDomain)
                .orElseThrow(() -> new BaseException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    @Override
    @Transactional
    public Question createQuestion(Question question) {
        QuestionEntity entity = QuestionEntityMapper.INSTANCE.toEntity(question);

        if (question.getOptions() != null && !question.getOptions().isEmpty()) {
            List<OptionEntity> optionEntities = question.getOptions().stream()
                    .map(OptionEntityMapper.INSTANCE::toEntity)
                    .toList();

            entity.setOptions(optionEntities);
        } else {
            entity.setOptions(new ArrayList<>());
        }

        if (question.getTags() != null && !question.getTags().isEmpty()) {
            List<TagEntity> tagEntities = question.getTags().stream()
                    .map(tag -> tagRepository.findById(tag.getId())
                            .orElseThrow(() -> new BaseException(ExceptionCode.TAG_NOT_FOUND)))
                    .toList();
            entity.setTags(tagEntities);
        } else {
            entity.setTags(new ArrayList<>());
        }

        QuestionEntity savedEntity = questionRepository.save(entity);
        return QuestionEntityMapper.INSTANCE.toDomain(savedEntity);
    }

    @Override
    @Transactional
    public Question updateQuestion(Question question) {
        QuestionEntity existingEntity = questionRepository.findById(question.getId())
                .orElseThrow(() -> new BaseException(ExceptionCode.QUESTION_NOT_FOUND));

        existingEntity.setName(question.getName());
        existingEntity.setQuestionType(question.getQuestionType());
        existingEntity.setMaxLength(question.getMaxLength());
        existingEntity.setRequired(question.isRequired());
        existingEntity.setText(question.getText());

        List<OptionEntity> existingOptions = existingEntity.getOptions();
        List<OptionEntity> newOptionEntities = question.getOptions() != null ?
                question.getOptions().stream()
                        .map(OptionEntityMapper.INSTANCE::toEntity)
                        .toList() : new ArrayList<>();

        Map<Long, OptionEntity> newOptionMap = newOptionEntities.stream()
                .filter(opt -> opt.getId() != null)
                .collect(Collectors.toMap(OptionEntity::getId, opt -> opt));

        // Remove options that are no longer present
        existingOptions.removeIf(existingOpt -> !newOptionMap.containsKey(existingOpt.getId()));

        for (OptionEntity newOpt : newOptionEntities) {
            if (newOpt.getId() == null) {
                // Add new options
                existingOptions.add(newOpt);
            } else {
                // Update existing options
                existingOptions.stream()
                        .filter(existingOpt -> existingOpt.getId().equals(newOpt.getId()))
                        .findFirst()
                        .ifPresent(existingOpt -> {
                            existingOpt.setText(newOpt.getText());
                        });
            }
        }

        if (question.getTags() != null && !question.getTags().isEmpty()) {
            List<TagEntity> tagEntities = question.getTags().stream()
                    .map(tag -> tagRepository.findById(tag.getId())
                            .orElseThrow(() -> new BaseException(ExceptionCode.TAG_NOT_FOUND)))
                    .collect(Collectors.toList());
            existingEntity.setTags(tagEntities);
        } else {
            existingEntity.setTags(new ArrayList<>());
        }

        QuestionEntity savedEntity = questionRepository.save(existingEntity);

        return QuestionEntityMapper.INSTANCE.toDomain(savedEntity);
    }

    @Override
    @Transactional
    public void deleteQuestion(Long questionId) {
        if (!questionRepository.existsById(questionId)) {
            throw new BaseException(ExceptionCode.QUESTION_NOT_FOUND);
        }
        questionRepository.deleteById(questionId);
    }
}