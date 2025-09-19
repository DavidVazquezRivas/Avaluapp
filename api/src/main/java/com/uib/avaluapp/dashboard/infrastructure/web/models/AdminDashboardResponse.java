package com.uib.avaluapp.dashboard.infrastructure.web.models;

import com.uib.avaluapp.action.domain.models.Action;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AdminDashboardResponse implements DashboardResponse {
    private int totalProjects;
    private int totalSurveys;
    private int totalUsers;
    private int totalResponses;
    private List<Action> recentActivity;
}
