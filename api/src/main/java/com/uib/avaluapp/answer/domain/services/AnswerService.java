package com.uib.avaluapp.answer.domain.services;

import com.uib.avaluapp.answer.infrastructure.web.models.AnswerBySurveyResponse;
import com.uib.avaluapp.answer.infrastructure.web.models.AnswerByTagResponse;
import com.uib.avaluapp.answer.infrastructure.web.models.QuestionAnswersDto;
import com.uib.avaluapp.answer.infrastructure.web.models.SubmitAnswerRequest;

import java.util.List;

public interface AnswerService {
    void submitAnswers(List<SubmitAnswerRequest> answers, String surveyUrlCode);

    List<AnswerBySurveyResponse> getAllUserAnswers(String authorization);

    List<QuestionAnswersDto> getProjectAnswers(String authorization, Long projectId);

    List<AnswerByTagResponse> getProjectAnswersByTags(String authorization, Long projectId, List<Long> tagIds);

    List<AnswerBySurveyResponse> getProjectAnswersBySurveys(String authorization, Long projectId, List<Long> surveysIds);
}
