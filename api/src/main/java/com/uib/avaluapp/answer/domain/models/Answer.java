package com.uib.avaluapp.answer.domain.models;

import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.surveys.domain.models.Survey;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Answer {
    private Long id;
    private Question question;
    private String answer;
    private Survey survey;
}
