package com.uib.avaluapp.answer.domain.services;

import com.uib.avaluapp.answer.domain.models.Answer;
import com.uib.avaluapp.answer.domain.ports.AnswerPort;
import com.uib.avaluapp.answer.infrastructure.web.mappers.AnswerBySurveyMapper;
import com.uib.avaluapp.answer.infrastructure.web.mappers.AnswerByTagMapper;
import com.uib.avaluapp.answer.infrastructure.web.mappers.AnswerDtoMapper;
import com.uib.avaluapp.answer.infrastructure.web.models.AnswerBySurveyResponse;
import com.uib.avaluapp.answer.infrastructure.web.models.AnswerByTagResponse;
import com.uib.avaluapp.answer.infrastructure.web.models.QuestionAnswersDto;
import com.uib.avaluapp.answer.infrastructure.web.models.SubmitAnswerRequest;
import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.project.domain.ports.ProjectPort;
import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.surveys.domain.models.Survey;
import com.uib.avaluapp.surveys.domain.ports.SurveyPort;
import com.uib.avaluapp.tags.domain.models.Tag;
import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {

    private final SurveyPort surveyPort;
    private final AnswerPort answerPort;
    private final ProjectPort projectPort;
    private final UserService userService;
    private final AnswerParserService answerParserService;

    @Override
    public void submitAnswers(List<SubmitAnswerRequest> answers, String surveyUrlCode) {
        Survey survey = surveyPort.getSurveyByUrlCode(surveyUrlCode);

        List<Answer> answerList = answers.stream().map(answerRequest -> {
            return Answer.builder()
                    .question(Question.builder()
                            .id(answerRequest.getQuestionId())
                            .build())
                    .answer(answerRequest.getAnswer())
                    .survey(survey)
                    .build();
        }).toList();

        List<Answer> savedAnswers = answerPort.saveAnswers(answerList);
    }

    @Override
    public List<QuestionAnswersDto> getAllUserAnswers(String authorization) {
        User user = userService.getSingleUser(authorization);
        List<Survey> surveys = surveyPort.getAllSurveysByLeadId(user.getId());

        List<Answer> answers = answerPort.getAllBySurveysIds(
                surveys.stream()
                        .map(Survey::getId)
                        .toList()
        );

        List<Answer> parsedAnswers = answerParserService.parseAnswersOptions(answers);

        return AnswerDtoMapper.INSTANCE.toQuestionDtoList(parsedAnswers);
    }

    @Override
    public List<QuestionAnswersDto> getProjectAnswers(String authorization, Long projectId) {
        User admin = userService.getSingleUser(authorization);
        Project project = projectPort.getProjectById(projectId);

        if (!project.getAdmin().getId().equals(admin.getId()))
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);

        List<Answer> answers = answerPort.getAllByProjectId(projectId);

        List<Answer> parsedAnswers = answerParserService.parseAnswersOptions(answers);

        return AnswerDtoMapper.INSTANCE.toQuestionDtoList(parsedAnswers);
    }

    @Override
    public List<AnswerByTagResponse> getProjectAnswersByTags(String authorization, Long projectId, List<Long> tagIds) {
        User admin = userService.getSingleUser(authorization);
        Project project = projectPort.getProjectById(projectId);

        if (!project.getAdmin().getId().equals(admin.getId()))
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);

        List<Answer> answers = answerPort.getAllByProjectIdAndTagIds(tagIds);

        List<Answer> parsedAnswers = answerParserService.parseAnswersOptions(answers);

        Map<Tag, List<Answer>> answersByTag = parsedAnswers.stream()
                .collect(Collectors.groupingBy(answer -> answer.getSurvey().getTag()));

        return AnswerByTagMapper.INSTANCE.toResponseList(answersByTag);
    }

    @Override
    public List<AnswerBySurveyResponse> getProjectAnswersBySurveys(String authorization, Long projectId, List<Long> surveysIds) {
        User admin = userService.getSingleUser(authorization);
        Project project = projectPort.getProjectById(projectId);

        if (!project.getAdmin().getId().equals(admin.getId()))
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);

        List<Answer> answers = answerPort.getAllBySurveysIds(surveysIds);

        List<Answer> parsedAnswers = answerParserService.parseAnswersOptions(answers);

        Map<Survey, List<Answer>> answersBySurvey = parsedAnswers.stream()
                .collect(Collectors.groupingBy(Answer::getSurvey));

        return AnswerBySurveyMapper.INSTANCE.toResponseList(answersBySurvey);
    }
}
