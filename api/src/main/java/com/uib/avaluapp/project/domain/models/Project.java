package com.uib.avaluapp.project.domain.models;

import com.uib.avaluapp.user.domain.models.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class Project {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private User admin;
}
