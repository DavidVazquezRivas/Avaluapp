package com.uib.avaluapp.answer.domain.services;

import com.uib.avaluapp.answer.domain.models.Answer;
import com.uib.avaluapp.answer.domain.ports.AnswerPort;
import com.uib.avaluapp.answer.infrastructure.web.models.SubmitAnswerRequest;
import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.surveys.domain.models.Survey;
import com.uib.avaluapp.surveys.domain.ports.SurveyPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {

    private final SurveyPort surveyPort;
    private final AnswerPort answerPort;

    @Override
    public void submitAnswers(List<SubmitAnswerRequest> answers, String surveyUrlCode) {
        Survey survey = surveyPort.getSurveyByUrlCode(surveyUrlCode);

        for (SubmitAnswerRequest answerRequest : answers) {
            Answer answer = Answer.builder()
                    .question(Question.builder()
                            .id(answerRequest.getQuestionId())
                            .build())
                    .answer(answerRequest.getAnswer())
                    .survey(survey)
                    .build();

            answerPort.saveAnswer(answer);
        }
    }
}
