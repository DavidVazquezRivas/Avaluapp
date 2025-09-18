package com.uib.avaluapp.dashboard.infrastructure.web;

import com.uib.avaluapp.auth.domain.services.JwtService;
import com.uib.avaluapp.dashboard.domain.services.DashboardService;
import com.uib.avaluapp.dashboard.infrastructure.web.models.DashboardResponse;
import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.config.HandleConfig;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.questions.domain.services.QuestionService;
import com.uib.avaluapp.user.domain.ports.UserPort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController extends BaseController {


    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(JwtService jwtService, UserPort userPort, QuestionService questionService, DashboardService dashboardService) {
        super(jwtService, userPort);
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboardData(
            @RequestHeader("Authorization") String authorization
    ) {
        HandleConfig<DashboardResponse> config = HandleConfig.<DashboardResponse>builder()
                .authorization(authorization)
                .successMessage("Dashboard data retrieved successfully")
                .successStatus(HttpStatus.OK)
                .userHandler(() -> dashboardService.getUserDashboardData(authorization))
                .adminHandler(() -> dashboardService.getAdminDashboardData(authorization))
                .build();

        return handle(config);
    }
}
