package com.uib.avaluapp.project.domain.services;

import com.uib.avaluapp.project.infrastructure.web.requests.CreateProjectRequest;
import com.uib.avaluapp.project.infrastructure.web.responses.ProjectDto;

import java.util.List;

public interface ProjectService {
    ProjectDto createProject(String authorization, CreateProjectRequest request);

    ProjectDto getProjectById(Long id, String authorization);

    ProjectDto updateProject(Long id, String authorization, CreateProjectRequest request);

    void deleteProject(Long id, String authorization);

    List<ProjectDto> getAllProjects(String authorization);
}
