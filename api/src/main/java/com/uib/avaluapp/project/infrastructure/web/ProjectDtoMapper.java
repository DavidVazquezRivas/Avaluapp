package com.uib.avaluapp.project.infrastructure.web;

import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.project.infrastructure.web.responses.ProjectDto;
import com.uib.avaluapp.user.infrastructure.web.UserDtoMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = UserDtoMapper.class)
public interface ProjectDtoMapper {
    ProjectDtoMapper INSTANCE = Mappers.getMapper(ProjectDtoMapper.class);

    ProjectDto toDto(Project project);

    List<ProjectDto> toDtoList(List<Project> projects);
}
