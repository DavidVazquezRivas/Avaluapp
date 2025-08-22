package com.uib.avaluapp.questions.infrastructure.web.responses;

import com.uib.avaluapp.questions.domain.models.QuestionType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SimplifiedQuestionDto {
    private Long id;
    private String name;
    private String text;
    private QuestionType questionType;
}
