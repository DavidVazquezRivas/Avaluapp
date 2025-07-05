package com.uib.avaluapp.project.infrastructure.web.requests;

import lombok.Data;

@Data
public class CreateProjectRequest {
    private String name;
    private String description;
}
