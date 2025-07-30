package com.uib.avaluapp.surveys.infrastructure.web.responses;

import com.uib.avaluapp.project.infrastructure.web.responses.ProjectDto;
import com.uib.avaluapp.tags.infrastructure.web.responses.TagDto;
import com.uib.avaluapp.user.infrastructure.web.responses.UserDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SurveyDto {
    private Long id;
    private String name;
    private String createdAt;
    private String urlCode;
    private String status;
    private UserDto lead;
    private ProjectDto project;
    private TagDto tag;
}
