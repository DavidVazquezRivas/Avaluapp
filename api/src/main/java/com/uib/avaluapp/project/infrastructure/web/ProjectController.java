package com.uib.avaluapp.project.infrastructure.web;

import com.uib.avaluapp.auth.domain.services.JwtService;
import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.config.HandleConfig;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.project.domain.services.ProjectService;
import com.uib.avaluapp.project.infrastructure.web.requests.CreateProjectRequest;
import com.uib.avaluapp.project.infrastructure.web.responses.ProjectDto;
import com.uib.avaluapp.user.domain.ports.UserPort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController extends BaseController {
    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService, JwtService jwtService, UserPort userPort) {
        super(jwtService, userPort);
        this.projectService = projectService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDto>> getProjectById(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id) {
        HandleConfig<ProjectDto> config = HandleConfig.<ProjectDto>builder()
                .authorization(authorization)
                .successMessage("Project retrieved successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> projectService.getProjectById(id, authorization))
                .build();
        return handle(config);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getAllProjects(
            @RequestHeader("Authorization") String authorization) {
        HandleConfig<List<ProjectDto>> config = HandleConfig.<List<ProjectDto>>builder()
                .authorization(authorization)
                .successMessage("Projects retrieved successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> projectService.getAllProjects(authorization))
                .build();
        return handle(config);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectDto>> createProject(
            @RequestBody CreateProjectRequest request,
            @RequestHeader("Authorization") String authorization) {
        HandleConfig<ProjectDto> config = HandleConfig.<ProjectDto>builder()
                .authorization(authorization)
                .successMessage("Project created successfully")
                .successStatus(HttpStatus.CREATED)
                .adminHandler(() -> projectService.createProject(authorization, request))
                .build();
        return handle(config);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDto>> updateProject(
            @PathVariable Long id,
            @RequestBody CreateProjectRequest request,
            @RequestHeader("Authorization") String authorization) {
        HandleConfig<ProjectDto> config = HandleConfig.<ProjectDto>builder()
                .authorization(authorization)
                .successMessage("Project updated successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> projectService.updateProject(id, authorization, request))
                .build();
        return handle(config);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authorization) {
        HandleConfig<Void> config = HandleConfig.<Void>builder()
                .authorization(authorization)
                .successMessage("Project deleted successfully")
                .successStatus(HttpStatus.NO_CONTENT)
                .adminHandler(HandleConfig.from(() -> projectService.deleteProject(id, authorization)))
                .build();
        return handle(config);
    }
}
