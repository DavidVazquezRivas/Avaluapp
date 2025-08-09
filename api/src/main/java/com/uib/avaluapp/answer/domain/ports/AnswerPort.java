package com.uib.avaluapp.answer.domain.ports;

import com.uib.avaluapp.answer.domain.models.Answer;

public interface AnswerPort {
    Answer saveAnswer(Answer answer);
}
