package com.uib.avaluapp.questions.domain.models;

import com.uib.avaluapp.project.domain.models.Project;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class Question {
    private Long id;
    private String text;
    private LocalDateTime createdAt;
    private QuestionType questionType;
    private boolean required;
    private int maxLength;
    private Project project;
    private List<Option> options;
}
