package com.uib.avaluapp.answer.infrastructure.web.controllers;

import com.uib.avaluapp.answer.domain.services.AnswerService;
import com.uib.avaluapp.answer.infrastructure.web.models.SubmitAnswerRequest;
import com.uib.avaluapp.auth.domain.services.JwtService;
import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.questions.domain.services.QuestionService;
import com.uib.avaluapp.questions.infrastructure.web.responses.CompleteQuestionDto;
import com.uib.avaluapp.user.domain.ports.UserPort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/answers")
public class PublicAnswerController extends BaseController {

    private final QuestionService questionService;
    private final AnswerService answerService;

    @Autowired
    public PublicAnswerController(QuestionService questionService, JwtService jwtService, UserPort userPort, AnswerService answerService) {
        super(jwtService, userPort);
        this.questionService = questionService;
        this.answerService = answerService;
    }

    @GetMapping("{code}")
    public ResponseEntity<ApiResponse<List<CompleteQuestionDto>>> getQuestionsBySurveyCode(@PathVariable String code) {
        try {
            List<CompleteQuestionDto> questions = questionService.getQuestionsBySurveyCode(code);

            return ResponseEntity.ok(ApiResponse.<List<CompleteQuestionDto>>builder()
                    .success(true)
                    .message("Questions retrieved successfully")
                    .data(questions)
                    .build());
        } catch (BaseException e) {
            return ResponseEntity
                    .status(e.getCode())
                    .body(ApiResponse.<List<CompleteQuestionDto>>builder()
                            .success(false)
                            .message(e.getMessage())
                            .build());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<List<CompleteQuestionDto>>builder()
                            .success(false)
                            .message("Unexpected error: " + e.getMessage())
                            .build());
        }
    }

    @PostMapping("{code}")
    public ResponseEntity<ApiResponse<Void>> submitAnswers(@PathVariable String code,
                                                           @RequestBody List<SubmitAnswerRequest> answers) {
        try {
            answerService.submitAnswers(answers, code);

            return ResponseEntity.ok(ApiResponse.<Void>builder()
                    .success(true)
                    .message("Answers submitted successfully")
                    .build());
        } catch (BaseException e) {
            return ResponseEntity
                    .status(e.getCode())
                    .body(ApiResponse.<Void>builder()
                            .success(false)
                            .message(e.getMessage())
                            .build());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<Void>builder()
                            .success(false)
                            .message("Unexpected error: " + e.getMessage())
                            .build());
        }
    }
}
