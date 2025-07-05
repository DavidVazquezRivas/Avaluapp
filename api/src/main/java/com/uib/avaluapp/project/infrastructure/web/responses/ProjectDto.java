package com.uib.avaluapp.project.infrastructure.web.responses;

import com.uib.avaluapp.user.infrastructure.web.responses.UserDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProjectDto {
    private Long id;
    private String name;
    private String description;
    private String createdAt;
    private UserDto admin;
}
