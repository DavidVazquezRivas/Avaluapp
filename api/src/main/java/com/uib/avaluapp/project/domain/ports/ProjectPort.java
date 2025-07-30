package com.uib.avaluapp.project.domain.ports;

import com.uib.avaluapp.project.domain.models.Project;

import java.util.List;

public interface ProjectPort {
    Project createProject(Project project);

    Project getProjectById(Long id);

    Project getProjectByQuestionId(Long questionId);

    Project getProjectByTagId(Long tagId);

    List<Project> getAllProjectsByAdminId(Long adminId);

    void deleteProject(Long id);

    Project updateProject(Project project);
}
