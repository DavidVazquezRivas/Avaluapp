package com.uib.avaluapp.surveys.domain.services;

import com.uib.avaluapp.surveys.infrastructure.web.requests.CreateSurveyRequest;
import com.uib.avaluapp.surveys.infrastructure.web.responses.SurveyDto;

import java.util.List;

public interface SurveyService {
    List<SurveyDto> getAllSurveys(String authorization, Long projectId);

    List<SurveyDto> getAllLeadSurveys(String authorization);

    SurveyDto createSurvey(String authorization, CreateSurveyRequest request);

    void deleteSurvey(String authorization, Long surveyId);

    SurveyDto updateSurvey(String authorization, Long surveyId, CreateSurveyRequest request);

    void acceptSurvey(String authorization, Long surveyId);

    void rejectSurvey(String authorization, Long surveyId);
}
