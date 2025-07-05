package com.uib.avaluapp.project.infrastructure.data.adapters;

import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.project.infrastructure.data.models.ProjectEntity;
import com.uib.avaluapp.user.infrastructure.data.adapters.UserEntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = UserEntityMapper.class)
public interface ProjectEntityMapper {
    ProjectEntityMapper INSTANCE = Mappers.getMapper(ProjectEntityMapper.class);

    ProjectEntity toEntity(Project project);

    Project toDomain(ProjectEntity projectEntity);

    default List<Project> toDomainList(List<ProjectEntity> projectEntities) {
        return projectEntities.stream()
                .map(this::toDomain)
                .toList();
    }
}
