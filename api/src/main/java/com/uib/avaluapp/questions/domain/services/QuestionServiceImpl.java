package com.uib.avaluapp.questions.domain.services;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.project.domain.ports.ProjectPort;
import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.questions.domain.ports.QuestionPort;
import com.uib.avaluapp.questions.infrastructure.web.OptionDtoMapper;
import com.uib.avaluapp.questions.infrastructure.web.QuestionDtoMapper;
import com.uib.avaluapp.questions.infrastructure.web.requests.CreateQuestionRequest;
import com.uib.avaluapp.questions.infrastructure.web.requests.UpdateQuestionRequest;
import com.uib.avaluapp.questions.infrastructure.web.responses.CompleteQuestionDto;
import com.uib.avaluapp.questions.infrastructure.web.responses.QuestionDto;
import com.uib.avaluapp.tags.domain.models.Tag;
import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionPort questionPort;
    private final ProjectPort projectPort;
    private final UserService userService;

    @Override
    public List<QuestionDto> getAllQuestions(String authorization, Long projectId) {
        User admin = userService.getSingleUser(authorization);
        Project project = projectPort.getProjectById(projectId);

        if (!project.getAdmin().getId().equals(admin.getId()))
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);

        return QuestionDtoMapper.INSTANCE.toDtoList(questionPort.getAllByProjectId(projectId));
    }

    @Override
    public CompleteQuestionDto getQuestionById(String authorization, Long questionId) {
        User admin = userService.getSingleUser(authorization);
        Question question = questionPort.fetchOptions(
                questionPort.getQuestionById(questionId)
        );

        if (!question.getProject().getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        return QuestionDtoMapper.INSTANCE.toCompleteDto(question);
    }

    @Override
    public CompleteQuestionDto createQuestion(String authorization, CreateQuestionRequest request) {
        User admin = userService.getSingleUser(authorization);
        Project project = projectPort.getProjectById(request.getProjectId());

        if (!project.getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        if (!request.getQuestionType().hasOptions() && request.getOptions() != null && !request.getOptions().isEmpty()) {
            throw new BaseException(ExceptionCode.QUESTION_TYPE_MISMATCH);
        }

        Question question = Question.builder()
                .name(request.getName())
                .text(request.getText())
                .questionType(request.getQuestionType())
                .project(project)
                .required(request.isRequired())
                .maxLength(request.getMaxLength())
                .options(OptionDtoMapper.INSTANCE.toDomainListFromCreate(request.getOptions()))
                .tags(request.getTags().stream().map(tag -> Tag.builder().id(tag).build()).toList())
                .build();

        Question createdQuestion = questionPort.createQuestion(question);

        return QuestionDtoMapper.INSTANCE.toCompleteDto(questionPort.fetchOptions(createdQuestion));
    }

    @Override
    public CompleteQuestionDto updateQuestion(String authorization, Long questionId, UpdateQuestionRequest request) {
        User admin = userService.getSingleUser(authorization);
        Project project = projectPort.getProjectById(request.getProjectId());

        if (!project.getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        if (!request.getQuestionType().hasOptions() && request.getOptions() != null && !request.getOptions().isEmpty()) {
            throw new BaseException(ExceptionCode.QUESTION_TYPE_MISMATCH);
        }

        Question question = Question.builder()
                .id(questionId)
                .name(request.getName())
                .text(request.getText())
                .questionType(request.getQuestionType())
                .project(project)
                .required(request.isRequired())
                .maxLength(request.getMaxLength())
                .options(OptionDtoMapper.INSTANCE.toDomainListFromUpdate(request.getOptions()))
                .tags(request.getTags().stream().map(tag -> Tag.builder().id(tag).build()).toList())
                .build();

        questionPort.updateQuestion(question);

        return this.getQuestionById(authorization, questionId);
    }

    @Override
    public void deleteQuestion(String authorization, Long questionId) {
        User admin = userService.getSingleUser(authorization);
        Question question = questionPort.getQuestionById(questionId);

        if (!question.getProject().getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        questionPort.deleteQuestion(questionId);
    }
}
