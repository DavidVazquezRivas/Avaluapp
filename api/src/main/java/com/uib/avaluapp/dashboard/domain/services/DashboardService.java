package com.uib.avaluapp.dashboard.domain.services;

import com.uib.avaluapp.dashboard.infrastructure.web.models.AdminDashboardResponse;
import com.uib.avaluapp.dashboard.infrastructure.web.models.UserDashboardResponse;

public interface DashboardService {
    UserDashboardResponse getUserDashboardData(String authorization);

    AdminDashboardResponse getAdminDashboardData(String authorization);
}
