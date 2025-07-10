package com.uib.avaluapp.surveys.domain.ports;

import com.uib.avaluapp.surveys.domain.models.Survey;

import java.util.List;

public interface SurveyPort {
    Survey fetchLead(Survey survey);

    Survey fetchProject(Survey survey);

    List<Survey> getAllSurveysByProjectId(Long projectId);

    List<Survey> getAllSurveysByLeadId(Long leadId);

    Survey createSurvey(Survey survey);

    void deleteSurvey(Long surveyId);

    Survey updateSurvey(Survey survey);
}
