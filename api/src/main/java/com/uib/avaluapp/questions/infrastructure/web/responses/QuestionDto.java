package com.uib.avaluapp.questions.infrastructure.web.responses;

import com.uib.avaluapp.questions.domain.models.QuestionType;
import com.uib.avaluapp.tags.infrastructure.web.responses.TagDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class QuestionDto {
    private Long id;
    private String text;
    private LocalDateTime createdAt;
    private QuestionType questionType;
    private boolean required;
    private Integer maxLength;
    private List<TagDto> tags;
}
