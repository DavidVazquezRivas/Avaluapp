package com.uib.avaluapp.dashboard.infrastructure.web.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDashboardResponse implements DashboardResponse {
    private int pendingSurveys;
    private int acceptedSurveys;
    private int totalResponses;
    private int totalProjects;
}
