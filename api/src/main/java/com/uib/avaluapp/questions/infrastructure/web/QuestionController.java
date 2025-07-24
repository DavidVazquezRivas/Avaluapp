package com.uib.avaluapp.questions.infrastructure.web;

import com.uib.avaluapp.auth.domain.services.JwtService;
import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.config.HandleConfig;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.questions.domain.services.QuestionService;
import com.uib.avaluapp.questions.infrastructure.web.requests.CreateQuestionRequest;
import com.uib.avaluapp.questions.infrastructure.web.requests.UpdateQuestionRequest;
import com.uib.avaluapp.questions.infrastructure.web.responses.CompleteQuestionDto;
import com.uib.avaluapp.questions.infrastructure.web.responses.QuestionDto;
import com.uib.avaluapp.user.domain.ports.UserPort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController extends BaseController {
    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService, JwtService jwtService, UserPort userPort) {
        super(jwtService, userPort);
        this.questionService = questionService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CompleteQuestionDto>> getQuestionById(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id) {
        HandleConfig<CompleteQuestionDto> config = HandleConfig.<CompleteQuestionDto>builder()
                .authorization(authorization)
                .successMessage("Question retrieved successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> questionService.getQuestionById(authorization, id))
                .build();

        return handle(config);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<ApiResponse<List<QuestionDto>>> getAllQuestions(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long projectId) {
        HandleConfig<List<QuestionDto>> config = HandleConfig.<List<QuestionDto>>builder()
                .authorization(authorization)
                .successMessage("Questions retrieved successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> questionService.getAllQuestions(authorization, projectId))
                .build();

        return handle(config);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CompleteQuestionDto>> createQuestion(
            @RequestBody CreateQuestionRequest request,
            @RequestHeader("Authorization") String authorization) {
        HandleConfig<CompleteQuestionDto> config = HandleConfig.<CompleteQuestionDto>builder()
                .authorization(authorization)
                .successMessage("Question created successfully")
                .successStatus(HttpStatus.CREATED)
                .adminHandler(() -> questionService.createQuestion(authorization, request))
                .build();

        return handle(config);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CompleteQuestionDto>> updateQuestion(
            @PathVariable Long id,
            @RequestBody UpdateQuestionRequest request,
            @RequestHeader("Authorization") String authorization) {
        HandleConfig<CompleteQuestionDto> config = HandleConfig.<CompleteQuestionDto>builder()
                .authorization(authorization)
                .successMessage("Question updated successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> questionService.updateQuestion(authorization, id, request))
                .build();

        return handle(config);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authorization) {
        HandleConfig<Void> config = HandleConfig.<Void>builder()
                .authorization(authorization)
                .successMessage("Question deleted successfully")
                .successStatus(HttpStatus.NO_CONTENT)
                .adminHandler(HandleConfig.from(() -> questionService.deleteQuestion(authorization, id)))
                .build();

        return handle(config);
    }
}
