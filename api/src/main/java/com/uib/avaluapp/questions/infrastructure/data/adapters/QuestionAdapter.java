package com.uib.avaluapp.questions.infrastructure.data.adapters;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.questions.domain.ports.QuestionPort;
import com.uib.avaluapp.questions.infrastructure.data.QuestionEntityMapper;
import com.uib.avaluapp.questions.infrastructure.data.models.QuestionEntity;
import com.uib.avaluapp.questions.infrastructure.data.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuestionAdapter implements QuestionPort {

    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionAdapter(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public Question fetchOptions(Question question) {
        Long id = question.getId();
        return questionRepository.findWithOptions(id)
                .map(QuestionEntityMapper.INSTANCE::toDomain)
                .orElseThrow(() -> new BaseException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    @Override
    public List<Question> getAllByProjectId(Long projectId) {
        List<QuestionEntity> entities = questionRepository.findAllByProjectId(projectId);
        return QuestionEntityMapper.INSTANCE.toDomainList(entities);
    }

    @Override
    public Question getQuestionById(Long questionId) {
        return questionRepository.findById(questionId)
                .map(QuestionEntityMapper.INSTANCE::toDomain)
                .orElseThrow(() -> new BaseException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    @Override
    public Question createQuestion(Question question) {
        QuestionEntity entity = QuestionEntityMapper.INSTANCE.toEntity(question);
        QuestionEntity savedEntity = questionRepository.save(entity);
        return QuestionEntityMapper.INSTANCE.toDomain(savedEntity);
    }

    @Override
    public Question updateQuestion(Question question) {
        QuestionEntity existingEntity = questionRepository.findById(question.getId())
                .orElseThrow(() -> new BaseException(ExceptionCode.QUESTION_NOT_FOUND));

        existingEntity.setQuestionType(question.getQuestionType());
        existingEntity.setMaxLength(question.getMaxLength());
        existingEntity.setRequired(question.isRequired());
        existingEntity.setText(question.getText());

        QuestionEntity savedEntity = questionRepository.save(existingEntity);

        return QuestionEntityMapper.INSTANCE.toDomain(savedEntity);
    }

    @Override
    public void deleteQuestion(Long questionId) {
        if (!questionRepository.existsById(questionId)) {
            throw new BaseException(ExceptionCode.QUESTION_NOT_FOUND);
        }
        questionRepository.deleteById(questionId);
    }
}
