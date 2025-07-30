package com.uib.avaluapp.surveys.domain.models;

import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.tags.domain.models.Tag;
import com.uib.avaluapp.user.domain.models.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class Survey {
    private Long id;
    private String name;
    private LocalDateTime createdAt;
    private String urlCode;
    private SurveyStatus status;
    private User lead;
    private Project project;
    private Tag tag;
}
