package com.uib.avaluapp.answer.infrastructure.web.models;

import com.uib.avaluapp.questions.infrastructure.web.responses.SimplifiedQuestionDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuestionAnswersDto {
    private SimplifiedQuestionDto question;
    private List<AnswerDto> answers;
}
