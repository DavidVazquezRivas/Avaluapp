package com.uib.avaluapp.project.domain.services;

import com.uib.avaluapp.action.domain.models.Action;
import com.uib.avaluapp.action.domain.models.Activity;
import com.uib.avaluapp.action.domain.models.EntityType;
import com.uib.avaluapp.action.domain.ports.ActionPort;
import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.project.domain.ports.ProjectPort;
import com.uib.avaluapp.project.infrastructure.web.ProjectDtoMapper;
import com.uib.avaluapp.project.infrastructure.web.requests.CreateProjectRequest;
import com.uib.avaluapp.project.infrastructure.web.responses.ProjectDto;
import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final UserService userService;
    private final ProjectPort projectPort;
    private final ActionPort actionPort;

    @Override
    public ProjectDto createProject(String authorization, CreateProjectRequest request) {
        User admin = userService.getSingleUser(authorization);
        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .admin(admin)
                .build();

        Action action = Action.builder()
                .entityType(EntityType.PROJECT)
                .action(Activity.CREATED)
                .entity(project.getName())
                .build();
        actionPort.logAction(admin.getId(), action);

        return ProjectDtoMapper.INSTANCE.toDto(projectPort.createProject(project));
    }

    @Override
    public ProjectDto getProjectById(Long id, String authorization) {
        Project project = projectPort.getProjectById(id);
        User admin = userService.getSingleUser(authorization);
        if (!project.getAdmin().getId().equals(admin.getId()))
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);

        return ProjectDtoMapper.INSTANCE.toDto(project);
    }

    @Override
    public ProjectDto updateProject(Long id, String authorization, CreateProjectRequest request) {
        Project project = projectPort.getProjectById(id);
        User admin = userService.getSingleUser(authorization);
        if (!project.getAdmin().getId().equals(admin.getId()))
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);

        project.setName(request.getName());
        project.setDescription(request.getDescription());

        Action action = Action.builder()
                .entityType(EntityType.PROJECT)
                .action(Activity.UPDATED)
                .entity(project.getName())
                .build();
        actionPort.logAction(admin.getId(), action);

        return ProjectDtoMapper.INSTANCE.toDto(projectPort.updateProject(project));
    }

    @Override
    public void deleteProject(Long id, String authorization) {
        Project project = projectPort.getProjectById(id);
        User admin = userService.getSingleUser(authorization);
        if (!project.getAdmin().getId().equals(admin.getId()))
            throw new BaseException(ExceptionCode.PROJECT_UNAUTHORIZED);

        Action action = Action.builder()
                .entityType(EntityType.PROJECT)
                .action(Activity.DELETED)
                .entity(project.getName())
                .build();

        projectPort.deleteProject(id);
    }

    @Override
    public List<ProjectDto> getAllProjects(String authorization) {
        User admin = userService.getSingleUser(authorization);

        List<Project> projects = projectPort.getAllProjectsByAdminId(admin.getId());
        return ProjectDtoMapper.INSTANCE.toDtoList(projects);
    }
}
