package com.uib.avaluapp.project.infrastructure.data.adapters;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.project.domain.ports.ProjectPort;
import com.uib.avaluapp.project.infrastructure.data.models.ProjectEntity;
import com.uib.avaluapp.project.infrastructure.data.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProjectAdapter implements ProjectPort {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectAdapter(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project createProject(Project project) {
        ProjectEntity entity = projectRepository.save(ProjectEntityMapper.INSTANCE.toEntity(project));
        return ProjectEntityMapper.INSTANCE.toDomain(entity);
    }

    @Override
    public Project getProjectById(Long id) {
        ProjectEntity projectEntity = projectRepository.findById(id)
                .orElseThrow(() -> new BaseException(ExceptionCode.PROJECT_NOT_FOUND));
        return ProjectEntityMapper.INSTANCE.toDomain(projectEntity);
    }

    @Override
    public List<Project> getAllProjectsByAdminId(Long adminId) {
        List<ProjectEntity> projectEntities = projectRepository.findAllByAdminId(adminId);
        if (projectEntities.isEmpty()) throw new BaseException(ExceptionCode.PROJECT_NOT_FOUND);

        return ProjectEntityMapper.INSTANCE.toDomainList(projectEntities);
    }

    @Override
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new BaseException(ExceptionCode.PROJECT_NOT_FOUND);
        }

        projectRepository.deleteById(id);
    }

    @Override
    public Project updateProject(Project project) {
        if (!projectRepository.existsById(project.getId())) {
            throw new BaseException(ExceptionCode.PROJECT_NOT_FOUND);
        }

        ProjectEntity entity = projectRepository.save(ProjectEntityMapper.INSTANCE.toEntity(project));
        return ProjectEntityMapper.INSTANCE.toDomain(entity);
    }
}
