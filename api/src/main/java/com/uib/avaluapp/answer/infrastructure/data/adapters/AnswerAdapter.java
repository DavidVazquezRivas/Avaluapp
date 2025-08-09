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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

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
}
