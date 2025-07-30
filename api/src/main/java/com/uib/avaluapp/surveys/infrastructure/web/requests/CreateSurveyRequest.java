package com.uib.avaluapp.surveys.infrastructure.web.requests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateSurveyRequest {
    private String name;
    private Long leadId;
    private Long projectId;
    private Long tag;
}
