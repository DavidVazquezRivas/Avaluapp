package com.uib.avaluapp.questions.domain.ports;

import com.uib.avaluapp.questions.domain.models.Question;

import java.util.List;

public interface QuestionPort {
    Question fetchOptions(Question question);

    List<Question> getAllByProjectId(Long projectId);

    Question getQuestionById(Long questionId);

    Question createQuestion(Question question);

    Question updateQuestion(Question question);

    void deleteQuestion(Long questionId);
}
