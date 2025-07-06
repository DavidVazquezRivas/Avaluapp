package com.uib.avaluapp.surveys.infrastructure.data.adapters;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.surveys.domain.models.Survey;
import com.uib.avaluapp.surveys.domain.ports.SurveyPort;
import com.uib.avaluapp.surveys.infrastructure.data.models.SurveyEntity;
import com.uib.avaluapp.surveys.infrastructure.data.repository.SurveyRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SurveyAdapter implements SurveyPort {
    private final SurveyRepository surveyRepository;

    public SurveyAdapter(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    @Override
    public Survey fetchLead(Survey survey) {
        Long id = survey.getId();
        return surveyRepository.findWithLead(id)
                .map(SurveyEntityMapper.INSTANCE::toDomain)
                .orElseThrow(() -> new BaseException(ExceptionCode.SURVEY_NOT_FOUND));
    }

    @Override
    public Survey fetchProject(Survey survey) {
        Long id = survey.getId();
        return surveyRepository.findWithProject(id)
                .map(SurveyEntityMapper.INSTANCE::toDomain)
                .orElseThrow(() -> new BaseException(ExceptionCode.SURVEY_NOT_FOUND));
    }

    @Override
    public List<Survey> getAllSurveysByProjectId(Long projectId) {
        return surveyRepository.findAllByProjectId(projectId)
                .stream()
                .map(SurveyEntityMapper.INSTANCE::toDomain)
                .toList();
    }

    @Override
    public Survey createSurvey(Survey survey) {
        SurveyEntity entity = surveyRepository.save(SurveyEntityMapper.INSTANCE.toEntity(survey));
        return SurveyEntityMapper.INSTANCE.toDomain(entity);
    }

    @Override
    public void deleteSurvey(Long surveyId) {
        if (!surveyRepository.existsById(surveyId)) {
            throw new BaseException(ExceptionCode.SURVEY_NOT_FOUND);
        }

        surveyRepository.deleteById(surveyId);
    }

    @Override
    public Survey updateSurvey(Survey survey) {
        if (!surveyRepository.existsById(survey.getId())) {
            throw new BaseException(ExceptionCode.SURVEY_NOT_FOUND);
        }

        SurveyEntity entity = surveyRepository.save(SurveyEntityMapper.INSTANCE.toEntity(survey));
        return SurveyEntityMapper.INSTANCE.toDomain(entity);
    }
}
