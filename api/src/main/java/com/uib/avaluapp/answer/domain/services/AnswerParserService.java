package com.uib.avaluapp.answer.domain.services;

import com.uib.avaluapp.answer.domain.models.Answer;

import java.util.List;

public interface AnswerParserService {
    List<Answer> parseAnswersOptions(List<Answer> answers);
}
