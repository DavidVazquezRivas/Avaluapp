package com.uib.avaluapp.surveys.infrastructure.web;

import com.uib.avaluapp.auth.domain.services.JwtService;
import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.config.HandleConfig;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.surveys.domain.services.SurveyService;
import com.uib.avaluapp.surveys.infrastructure.web.requests.CreateSurveyRequest;
import com.uib.avaluapp.surveys.infrastructure.web.responses.SurveyDto;
import com.uib.avaluapp.user.domain.ports.UserPort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController extends BaseController {
    private final SurveyService surveyService;

    @Autowired
    public SurveyController(SurveyService surveyService,
                            JwtService jwtService,
                            UserPort userPort) {
        super(jwtService, userPort);
        this.surveyService = surveyService;
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResponse<List<SurveyDto>>> getAllSurveys(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long projectId) {
        HandleConfig<List<SurveyDto>> config = HandleConfig.<List<SurveyDto>>builder()
                .authorization(authorization)
                .successMessage("Surveys retrieved successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> surveyService.getAllSurveys(authorization, projectId))
                .build();

        return handle(config);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SurveyDto>>> getAllLeadSurveys(
            @RequestHeader("Authorization") String authorization) {
        HandleConfig<List<SurveyDto>> config = HandleConfig.<List<SurveyDto>>builder()
                .authorization(authorization)
                .successMessage("Lead surveys retrieved successfully")
                .successStatus(HttpStatus.OK)
                .userHandler(() -> surveyService.getAllLeadSurveys(authorization))
                .build();

        return handle(config);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SurveyDto>> createSurvey(
            @RequestHeader("Authorization") String authorization,
            @RequestBody CreateSurveyRequest request) {
        HandleConfig<SurveyDto> config = HandleConfig.<SurveyDto>builder()
                .authorization(authorization)
                .successMessage("Survey created successfully")
                .successStatus(HttpStatus.CREATED)
                .adminHandler(() -> surveyService.createSurvey(authorization, request))
                .build();

        return handle(config);
    }

    @DeleteMapping("/{surveyId}")
    public ResponseEntity<ApiResponse<Void>> deleteSurvey(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long surveyId) {
        HandleConfig<Void> config = HandleConfig.<Void>builder()
                .authorization(authorization)
                .successMessage("Survey deleted successfully")
                .successStatus(HttpStatus.NO_CONTENT)
                .adminHandler(HandleConfig.from(() -> surveyService.deleteSurvey(authorization, surveyId)))
                .build();

        return handle(config);
    }

    @PutMapping("/{surveyId}")
    public ResponseEntity<ApiResponse<SurveyDto>> updateSurvey(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long surveyId,
            @RequestBody CreateSurveyRequest request) {
        HandleConfig<SurveyDto> config = HandleConfig.<SurveyDto>builder()
                .authorization(authorization)
                .successMessage("Survey updated successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> surveyService.updateSurvey(authorization, surveyId, request))
                .build();

        return handle(config);
    }
}
