package com.uib.avaluapp.answer.domain.ports;

import com.uib.avaluapp.answer.domain.models.Answer;

import java.util.List;

public interface AnswerPort {
    Answer saveAnswer(Answer answer);

    List<Answer> saveAnswers(List<Answer> answers);

    List<Answer> getAllByProjectId(Long projectId);

    List<Answer> getAllByProjectIdAndTagIds(List<Long> tagIds);

    List<Answer> getAllBySurveysIds(List<Long> surveysIds);
}
