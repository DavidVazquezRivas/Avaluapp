package com.uib.avaluapp.dashboard.domain.services;

import com.uib.avaluapp.action.domain.models.Action;
import com.uib.avaluapp.action.domain.ports.ActionPort;
import com.uib.avaluapp.answer.domain.models.Answer;
import com.uib.avaluapp.answer.domain.ports.AnswerPort;
import com.uib.avaluapp.dashboard.infrastructure.web.models.AdminDashboardResponse;
import com.uib.avaluapp.dashboard.infrastructure.web.models.UserDashboardResponse;
import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.project.domain.ports.ProjectPort;
import com.uib.avaluapp.surveys.domain.models.Survey;
import com.uib.avaluapp.surveys.domain.models.SurveyStatus;
import com.uib.avaluapp.surveys.domain.ports.SurveyPort;
import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.ports.UserPort;
import com.uib.avaluapp.user.domain.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final UserService userService;
    private final SurveyPort surveyPort;
    private final AnswerPort answerPort;
    private final ProjectPort projectPort;
    private final UserPort userPort;
    private final ActionPort actionPort;

    @Override
    public UserDashboardResponse getUserDashboardData(String authorization) {
        User user = userService.getSingleUser(authorization);

        List<Survey> surveys = surveyPort.getAllSurveysByLeadId(user.getId());
        List<Answer> answers = answerPort.getAllBySurveysIds(
                surveys.stream()
                        .map(Survey::getId)
                        .toList()
        );

        int acceptedSurveys = (int) surveys.stream()
                .filter((survey) -> survey.getStatus() == SurveyStatus.ACCEPTED)
                .count();

        int pendingSurveys = (int) surveys.stream()
                .filter((survey) -> survey.getStatus() == SurveyStatus.PENDING)
                .count();

        int projects = (int) surveys.stream()
                .map(survey -> survey.getProject().getId())
                .distinct()
                .count();

        return UserDashboardResponse.builder()
                .acceptedSurveys(acceptedSurveys)
                .pendingSurveys(pendingSurveys)
                .totalProjects(projects)
                .totalResponses(answers.size())
                .build();
    }

    @Override
    public AdminDashboardResponse getAdminDashboardData(String authorization) {
        User user = userService.getSingleUser(authorization);

        List<Project> projects = projectPort.getAllProjectsByAdminId(user.getId());
        List<Survey> surveys = projects.stream()
                .flatMap(project -> surveyPort.getAllSurveysByProjectId(project.getId()).stream())
                .toList();
        int answerCount = projects.stream()
                .mapToInt(project -> answerPort.getCountByProjectId(project.getId()))
                .sum();
        int totalUsers = userPort.getCreatedCount(user.getId());

        List<Action> recentActivity = actionPort.getActionsByUserId(user.getId());

        return AdminDashboardResponse.builder()
                .totalProjects(projects.size())
                .totalSurveys(surveys.size())
                .totalResponses(answerCount)
                .totalUsers(totalUsers)
                .recentActivity(recentActivity)
                .build();
    }
}
