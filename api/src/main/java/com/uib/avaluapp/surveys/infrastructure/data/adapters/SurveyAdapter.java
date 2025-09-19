package com.uib.avaluapp.surveys.infrastructure.data.adapters;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.surveys.domain.models.Survey;
import com.uib.avaluapp.surveys.domain.ports.SurveyPort;
import com.uib.avaluapp.surveys.infrastructure.data.models.SurveyEntity;
import com.uib.avaluapp.surveys.infrastructure.data.repository.SurveyRepository;
import com.uib.avaluapp.tags.infrastructure.data.adapters.TagEntityMapper;
import com.uib.avaluapp.user.infrastructure.data.repositories.UserRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SurveyAdapter implements SurveyPort {
    private final SurveyRepository surveyRepository;
    private final UserRepository userRepository;

    public SurveyAdapter(SurveyRepository surveyRepository, UserRepository userRepository) {
        this.surveyRepository = surveyRepository;
        this.userRepository = userRepository;
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
    public List<Survey> getAllSurveysByLeadId(Long leadId) {
        return surveyRepository.findAllByLeadId(leadId)
                .stream()
                .map(SurveyEntityMapper.INSTANCE::toDomain)
                .toList();
    }

    @Override
    public Survey getSurveyByUrlCode(String urlCode) {
        return surveyRepository.findByUrlCode(urlCode)
                .map(SurveyEntityMapper.INSTANCE::toDomain)
                .orElseThrow(() -> new BaseException(ExceptionCode.SURVEY_NOT_FOUND));
    }

    @Override
    public Survey getSurvey(Long surveyId) {
        return surveyRepository.findById(surveyId)
                .map(SurveyEntityMapper.INSTANCE::toDomain)
                .orElseThrow(() -> new BaseException(ExceptionCode.SURVEY_NOT_FOUND));
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
        SurveyEntity existing = surveyRepository.findById(survey.getId())
                .orElseThrow(() -> new BaseException(ExceptionCode.SURVEY_NOT_FOUND));

        existing.setName(survey.getName());
        existing.setTag(TagEntityMapper.INSTANCE.toEntity(survey.getTag()));
        existing.setLead(userRepository.findById(survey.getLead().getId())
                .orElseThrow(() -> new BaseException(ExceptionCode.USER_NOT_FOUND)));
        existing.setStatus(survey.getStatus());

        SurveyEntity saved = surveyRepository.save(existing);
        return SurveyEntityMapper.INSTANCE.toDomain(saved);
    }

}
