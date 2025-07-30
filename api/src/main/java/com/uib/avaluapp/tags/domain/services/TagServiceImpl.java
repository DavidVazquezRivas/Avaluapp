package com.uib.avaluapp.tags.domain.services;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.project.domain.ports.ProjectPort;
import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.questions.domain.ports.QuestionPort;
import com.uib.avaluapp.tags.domain.models.Tag;
import com.uib.avaluapp.tags.domain.ports.TagPort;
import com.uib.avaluapp.tags.infrastructure.web.mapper.CompleteTagDtoMapper;
import com.uib.avaluapp.tags.infrastructure.web.mapper.TagDtoMapper;
import com.uib.avaluapp.tags.infrastructure.web.requests.CreateTagRequest;
import com.uib.avaluapp.tags.infrastructure.web.responses.CompleteTagDto;
import com.uib.avaluapp.tags.infrastructure.web.responses.TagDto;
import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final UserService userService;
    private final TagPort tagPort;
    private final ProjectPort projectPort;
    private final QuestionPort questionPort;

    @Override
    public CompleteTagDto getTagById(String authorization, Long id) {
        User admin = userService.getSingleUser(authorization);
        Project project = projectPort.getProjectByTagId(id);
        if (!project.getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        return CompleteTagDtoMapper.INSTANCE.toCompleteDto(tagPort.getTagById(id));
    }

    @Override
    public List<TagDto> getAllTags(String authorization, Long projectId) {
        User admin = userService.getSingleUser(authorization);
        Project project = projectPort.getProjectById(projectId);
        if (!project.getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        return TagDtoMapper.INSTANCE.toDtoList(tagPort.getAllTagsByProjectId(projectId));
    }

    @Override
    public CompleteTagDto createTag(String authorization, CreateTagRequest request) {
        User admin = userService.getSingleUser(authorization);
        Project project = projectPort.getProjectById(request.getProjectId());
        if (!project.getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        Tag tag = Tag.builder()
                .project(project)
                .name(request.getName())
                .color(request.getColor())
                .questions(request.getQuestionIds().stream().map(qId -> Question.builder().id(qId).build()).toList())
                .build();

        Tag created = tagPort.createTag(tag);

        return this.getTagById(authorization, created.getId());
    }

    @Override
    public CompleteTagDto updateTag(String authorization, Long id, CreateTagRequest request) {
        User admin = userService.getSingleUser(authorization);
        Project project = projectPort.getProjectByTagId(id);
        if (!project.getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        List<Question> questions = request.getQuestionIds().stream()
                .map(this::safeGetQuestion)
                .filter(Objects::nonNull)
                .toList();

        Tag tag = tagPort.getTagById(id);

        tag.setName(request.getName());
        tag.setColor(request.getColor());
        tag.setQuestions(questions);

        tagPort.updateTag(tag);

        return this.getTagById(authorization, id);
    }

    @Override
    public void deleteTag(String authorization, Long id) {
        User admin = userService.getSingleUser(authorization);
        Project project = projectPort.getProjectByTagId(id);
        if (!project.getAdmin().getId().equals(admin.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);
        }

        tagPort.deleteTag(id);
    }

    private Question safeGetQuestion(Long questionId) {
        try {
            return questionPort.getQuestionById(questionId);
        } catch (BaseException ex) {
            if (ex.getCode() != ExceptionCode.QUESTION_NOT_FOUND.getCode()) {
                throw ex;
            }
            return null;
        }
    }
}
