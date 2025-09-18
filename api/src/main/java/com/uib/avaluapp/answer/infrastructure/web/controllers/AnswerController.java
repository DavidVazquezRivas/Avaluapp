package com.uib.avaluapp.answer.infrastructure.web.controllers;

import com.uib.avaluapp.answer.domain.services.AnswerService;
import com.uib.avaluapp.answer.infrastructure.web.models.AnswerBySurveyResponse;
import com.uib.avaluapp.answer.infrastructure.web.models.AnswerByTagResponse;
import com.uib.avaluapp.answer.infrastructure.web.models.QuestionAnswersDto;
import com.uib.avaluapp.auth.domain.services.JwtService;
import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.config.HandleConfig;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.user.domain.ports.UserPort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController extends BaseController {
    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService,
                            JwtService jwtService,
                            UserPort userPort) {
        super(jwtService, userPort);
        this.answerService = answerService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AnswerBySurveyResponse>>> getAllAnswers(
            @RequestHeader("Authorization") String authorization) {
        HandleConfig<List<AnswerBySurveyResponse>> config = HandleConfig.<List<AnswerBySurveyResponse>>builder()
                .authorization(authorization)
                .successMessage("Answers retrieved successfully")
                .successStatus(HttpStatus.OK)
                .userHandler(() -> answerService.getAllUserAnswers(authorization))
                .build();

        return handle(config);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResponse<List<QuestionAnswersDto>>> getProjectAnswers(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long projectId) {
        HandleConfig<List<QuestionAnswersDto>> config = HandleConfig.<List<QuestionAnswersDto>>builder()
                .authorization(authorization)
                .successMessage("Project answers retrieved successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> answerService.getProjectAnswers(authorization, projectId))
                .build();

        return handle(config);
    }

    @GetMapping("/{projectId}/tags")
    public ResponseEntity<ApiResponse<List<AnswerByTagResponse>>> getProjectAnswersByTags(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long projectId,
            @RequestParam List<Long> tagIds) {
        HandleConfig<List<AnswerByTagResponse>> config = HandleConfig.<List<AnswerByTagResponse>>builder()
                .authorization(authorization)
                .successMessage("Project answers filtered by tags retrieved successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> answerService.getProjectAnswersByTags(authorization, projectId, tagIds))
                .build();

        return handle(config);
    }

    @GetMapping("/{projectId}/surveys")
    public ResponseEntity<ApiResponse<List<AnswerBySurveyResponse>>> getProjectAnswersBySurveys(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long projectId,
            @RequestParam List<Long> surveyIds) {
        HandleConfig<List<AnswerBySurveyResponse>> config = HandleConfig.<List<AnswerBySurveyResponse>>builder()
                .authorization(authorization)
                .successMessage("Project answers filtered by surveys retrieved successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> answerService.getProjectAnswersBySurveys(authorization, projectId, surveyIds))
                .build();

        return handle(config);
    }
}
