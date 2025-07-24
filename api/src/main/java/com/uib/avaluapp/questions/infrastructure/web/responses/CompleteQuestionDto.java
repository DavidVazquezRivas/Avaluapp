package com.uib.avaluapp.questions.infrastructure.web.responses;

import com.uib.avaluapp.project.infrastructure.web.responses.ProjectDto;
import com.uib.avaluapp.questions.domain.models.QuestionType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class CompleteQuestionDto {
    private Long id;
    private String text;
    private LocalDateTime createdAt;
    private QuestionType questionType;
    private boolean required;
    private int maxLength;
    private ProjectDto project;
    private List<OptionDto> options;
}
