package com.uib.avaluapp.surveys.domain.services;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.project.domain.ports.ProjectPort;
import com.uib.avaluapp.surveys.domain.models.Survey;
import com.uib.avaluapp.surveys.domain.models.SurveyStatus;
import com.uib.avaluapp.surveys.domain.ports.SurveyPort;
import com.uib.avaluapp.surveys.infrastructure.web.SurveyDtoMapper;
import com.uib.avaluapp.surveys.infrastructure.web.requests.CreateSurveyRequest;
import com.uib.avaluapp.surveys.infrastructure.web.responses.SurveyDto;
import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.ports.UserPort;
import com.uib.avaluapp.user.domain.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {

    private final UserService userService;
    private final SurveyPort surveyPort;
    private final ProjectPort projectPort;
    private final UserPort userPort;

    @Override
    public List<SurveyDto> getAllSurveys(String authorization, Long projectId) {
        User admin = userService.getSingleUser(authorization);

        Project project = projectPort.getProjectById(projectId);
        if (!project.getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        List<Survey> surveys = surveyPort.getAllSurveysByProjectId(projectId)
                .stream()
                .map(surveyPort::fetchLead)
                .toList();

        return SurveyDtoMapper.INSTANCE.toDtoList(surveys);
    }

    @Override
    public List<SurveyDto> getAllLeadSurveys(String authorization) {
        User lead = userService.getSingleUser(authorization);

        List<Survey> surveys = surveyPort.getAllSurveysByLeadId(lead.getId())
                .stream()
                .map(surveyPort::fetchProject)
                .toList();


        return SurveyDtoMapper.INSTANCE.toDtoList(surveys);
    }

    @Override
    public SurveyDto createSurvey(String authorization, CreateSurveyRequest request) {
        User admin = userService.getSingleUser(authorization);

        Project project = projectPort.getProjectById(request.getProjectId());
        if (!project.getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        User lead = userPort.getSingleUser(request.getLeadId());

        Survey survey = Survey.builder()
                .name(request.getName())
                .project(project)
                .lead(lead)
                .build();

        return SurveyDtoMapper.INSTANCE.toDto(surveyPort.createSurvey(survey));
    }

    @Override
    public void deleteSurvey(String authorization, Long surveyId) {
        User admin = userService.getSingleUser(authorization);
        Survey survey = surveyPort.fetchProject(Survey.builder().id(surveyId).build());

        if (!survey.getProject().getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        surveyPort.deleteSurvey(surveyId);
    }

    @Override
    public SurveyDto updateSurvey(String authorization, Long surveyId, CreateSurveyRequest request) {
        User admin = userService.getSingleUser(authorization);
        Survey survey = surveyPort.fetchProject(Survey.builder().id(surveyId).build());

        if (!survey.getProject().getAdmin().getId().equals(admin.getId()))
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);

        User lead = userPort.getSingleUser(request.getLeadId());

        if (!survey.getLead().getId().equals(lead.getId())) survey.setStatus(SurveyStatus.PENDING);
        survey.setName(request.getName());
        survey.setLead(lead);

        return SurveyDtoMapper.INSTANCE.toDto(surveyPort.updateSurvey(survey));
    }

    @Override
    public void acceptSurvey(String authorization, Long surveyId) {
        User lead = userService.getSingleUser(authorization);

        Survey survey = surveyPort.fetchLead(Survey.builder().id(surveyId).build());

        if (!survey.getLead().getId().equals(lead.getId())) throw new BaseException(ExceptionCode.SURVEY_UNAUTHORIZED);
        if (survey.getStatus() != SurveyStatus.PENDING)
            throw new BaseException(ExceptionCode.INCONSISTENT_SURVEY_STATUS);

        survey.setStatus(SurveyStatus.ACCEPTED);
        surveyPort.updateSurvey(survey);
    }

    @Override
    public void rejectSurvey(String authorization, Long surveyId) {
        User lead = userService.getSingleUser(authorization);

        Survey survey = surveyPort.fetchLead(Survey.builder().id(surveyId).build());

        if (!survey.getLead().getId().equals(lead.getId())) throw new BaseException(ExceptionCode.SURVEY_UNAUTHORIZED);
        if (survey.getStatus() != SurveyStatus.PENDING)
            throw new BaseException(ExceptionCode.INCONSISTENT_SURVEY_STATUS);

        survey.setStatus(SurveyStatus.REJECTED);
        surveyPort.updateSurvey(survey);
    }
}
