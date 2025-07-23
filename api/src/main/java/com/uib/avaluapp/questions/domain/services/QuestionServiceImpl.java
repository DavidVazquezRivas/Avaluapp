package com.uib.avaluapp.questions.domain.services;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.project.domain.ports.ProjectPort;
import com.uib.avaluapp.questions.domain.models.Option;
import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.questions.domain.ports.OptionPort;
import com.uib.avaluapp.questions.domain.ports.QuestionPort;
import com.uib.avaluapp.questions.infrastructure.web.OptionDtoMapper;
import com.uib.avaluapp.questions.infrastructure.web.QuestionDtoMapper;
import com.uib.avaluapp.questions.infrastructure.web.requests.CreateQuestionRequest;
import com.uib.avaluapp.questions.infrastructure.web.requests.UpdateQuestionRequest;
import com.uib.avaluapp.questions.infrastructure.web.responses.CompleteQuestionDto;
import com.uib.avaluapp.questions.infrastructure.web.responses.QuestionDto;
import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionPort questionPort;
    private final ProjectPort projectPort;
    private final UserService userService;
    private final OptionPort optionPort;

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
                .text(request.getText())
                .questionType(request.getQuestionType())
                .project(project)
                .required(request.isRequired())
                .maxLength(request.getMaxLength())
                .build();

        Question createdQuestion = questionPort.createQuestion(question);

        if (request.getOptions() != null && !request.getOptions().isEmpty()) {
            request.getOptions().forEach(optionRequest -> {
                Option option = OptionDtoMapper.INSTANCE.toDomain(optionRequest);
                option.setQuestion(createdQuestion);
                optionPort.createOption(option);
            });
        }

        return QuestionDtoMapper.INSTANCE.toCompleteDto(questionPort.fetchOptions(createdQuestion));
    }

    @Override
    public CompleteQuestionDto updateQuestion(String authorization, Long questionId, UpdateQuestionRequest request) {
        User admin = userService.getSingleUser(authorization);

        Question newQuestion = Question.builder()
                .id(questionId)
                .text(request.getText())
                .questionType(request.getQuestionType())
                .maxLength(request.getMaxLength())
                .required(request.isRequired())
                .build();

        Question question = questionPort.fetchOptions(questionPort.updateQuestion(newQuestion));

        if (!question.getProject().getAdmin().getId().equals(admin.getId()))
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);

        List<Option> newOptions = OptionDtoMapper.INSTANCE.toDomainListFromUpdate(request.getOptions());

        if (!question.getQuestionType().hasOptions() && newOptions != null && !newOptions.isEmpty())
            throw new BaseException(ExceptionCode.QUESTION_TYPE_MISMATCH);

        Map<Long, Option> currentOptionsMap = question.getOptions().stream()
                .collect(Collectors.toMap(Option::getId, Function.identity()));

        Map<Long, Option> newOptionsMap = newOptions == null ? Collections.emptyMap() :
                newOptions.stream().peek(option -> option.setQuestion(question))
                        .collect(Collectors.toMap(Option::getId, Function.identity()));

        // Deleted options
        currentOptionsMap.keySet().stream()
                .filter(id -> !newOptionsMap.containsKey(id))
                .forEach(optionPort::deleteOption);

        // New options
        newOptionsMap.keySet().stream()
                .filter(id -> !currentOptionsMap.containsKey(id))
                .forEach(id -> optionPort.createOption(newOptionsMap.get(id)));

        // Updated options
        newOptionsMap.keySet().stream()
                .filter(currentOptionsMap::containsKey)
                .forEach(id -> optionPort.updateOption(newOptionsMap.get(id)));

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
