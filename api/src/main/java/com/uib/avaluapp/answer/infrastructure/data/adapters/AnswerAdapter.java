package com.uib.avaluapp.answer.infrastructure.data.adapters;

import com.uib.avaluapp.answer.domain.models.Answer;
import com.uib.avaluapp.answer.domain.ports.AnswerPort;
import com.uib.avaluapp.answer.infrastructure.data.models.AnswerEntity;
import com.uib.avaluapp.answer.infrastructure.data.repositories.AnswerRepository;
import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.questions.infrastructure.data.models.QuestionEntity;
import com.uib.avaluapp.questions.infrastructure.data.repositories.QuestionRepository;
import com.uib.avaluapp.surveys.infrastructure.data.models.SurveyEntity;
import com.uib.avaluapp.surveys.infrastructure.data.repository.SurveyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AnswerAdapter implements AnswerPort {
    private final QuestionRepository questionRepository;
    private final SurveyRepository surveyRepository;
    private final AnswerRepository answerRepository;

    @Override
    public Answer saveAnswer(Answer answer) {
        QuestionEntity questionEntity = questionRepository.findById(answer.getQuestion().getId())
                .orElseThrow(() -> new BaseException(ExceptionCode.QUESTION_NOT_FOUND));

        SurveyEntity surveyEntity = surveyRepository.findById(answer.getSurvey().getId())
                .orElseThrow(() -> new BaseException(ExceptionCode.SURVEY_NOT_FOUND));

        AnswerEntity entity = AnswerEntity.builder()
                .id(answer.getId())
                .question(questionEntity)
                .answer(answer.getAnswer())
                .survey(surveyEntity)
                .build();

        AnswerEntity savedEntity = answerRepository.save(entity);

        return AnswerEntityMapper.INSTANCE.toDomain(savedEntity);
    }

    @Override
    @Transactional
    public List<Answer> saveAnswers(List<Answer> answers) {
        if (answers == null || answers.isEmpty()) {
            return new ArrayList<>();
        }

        SurveyEntity surveyEntity = surveyRepository.findById(answers.getFirst().getSurvey().getId())
                .orElseThrow(() -> new BaseException(ExceptionCode.SURVEY_NOT_FOUND));

        Set<Long> questionIds = answers.stream()
                .map(answer -> answer.getQuestion().getId())
                .collect(Collectors.toSet());

        List<QuestionEntity> questionEntities = (List<QuestionEntity>) questionRepository.findAllById(questionIds);

        if (questionEntities.size() != questionIds.size())
            throw new BaseException(ExceptionCode.QUESTION_NOT_FOUND);


        Map<Long, QuestionEntity> questionMap = questionEntities.stream()
                .collect(Collectors.toMap(QuestionEntity::getId, Function.identity()));

        List<AnswerEntity> answerEntities = answers.stream()
                .map(answer -> AnswerEntity.builder()
                        .id(answer.getId())
                        .question(questionMap.get(answer.getQuestion().getId()))
                        .answer(answer.getAnswer())
                        .survey(surveyEntity)
                        .build())
                .collect(Collectors.toList());

        List<AnswerEntity> savedEntities = (List<AnswerEntity>) answerRepository.saveAll(answerEntities);

        return savedEntities.stream()
                .map(AnswerEntityMapper.INSTANCE::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Answer> getAllByProjectId(Long projectId) {
        List<AnswerEntity> entities = answerRepository.findAllByProjectId(projectId);

        return AnswerEntityMapper.INSTANCE.toDomainList(entities);
    }

    @Override
    public List<Answer> getAllByProjectIdAndTagIds(List<Long> tagIds) {
        List<AnswerEntity> entities = answerRepository.findAllByTagIds(tagIds);

        return AnswerEntityMapper.INSTANCE.toDomainList(entities);
    }

    @Override
    public List<Answer> getAllBySurveysIds(List<Long> surveysIds) {

        List<AnswerEntity> entities = surveysIds.stream()
                .map(answerRepository::findAllBySurveyId)
                .flatMap(List::stream)
                .toList();

        return AnswerEntityMapper.INSTANCE.toDomainList(entities);
    }

    @Override
    public int getCountByProjectId(Long projectId) {
        return answerRepository.countByProjectId(projectId).intValue();
    }
}
