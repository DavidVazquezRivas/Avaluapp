package com.uib.avaluapp.questions.domain.services;

import com.uib.avaluapp.questions.infrastructure.web.requests.CreateQuestionRequest;
import com.uib.avaluapp.questions.infrastructure.web.requests.UpdateQuestionRequest;
import com.uib.avaluapp.questions.infrastructure.web.responses.CompleteQuestionDto;
import com.uib.avaluapp.questions.infrastructure.web.responses.QuestionDto;

import java.util.List;

public interface QuestionService {
    List<QuestionDto> getAllQuestions(String authorization, Long projectId);

    CompleteQuestionDto getQuestionById(String authorization, Long questionId);

    CompleteQuestionDto createQuestion(String authorization, CreateQuestionRequest request);

    CompleteQuestionDto updateQuestion(String authorization, Long questionId, UpdateQuestionRequest request);

    void deleteQuestion(String authorization, Long questionId);
}
