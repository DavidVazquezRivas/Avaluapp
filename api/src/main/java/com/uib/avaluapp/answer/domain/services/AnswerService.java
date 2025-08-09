package com.uib.avaluapp.answer.domain.services;

import com.uib.avaluapp.answer.infrastructure.web.models.SubmitAnswerRequest;

import java.util.List;

public interface AnswerService {
    void submitAnswers(List<SubmitAnswerRequest> answers, String surveyUrlCode);
}
