package com.uib.avaluapp.questions.infrastructure.web.requests;

import com.uib.avaluapp.questions.domain.models.QuestionType;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UpdateQuestionRequest {
    private String name;
    private String text;
    private QuestionType questionType;
    private boolean required;
    private int maxLength;
    private Long projectId;
    private List<UpdateOptionRequest> options;
    private List<Long> tags;
}
