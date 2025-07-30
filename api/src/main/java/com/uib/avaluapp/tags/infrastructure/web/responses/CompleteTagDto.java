package com.uib.avaluapp.tags.infrastructure.web.responses;

import com.uib.avaluapp.questions.infrastructure.web.responses.QuestionDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CompleteTagDto {
    private Long id;
    private Long projectId;
    private String name;
    private String color;
    private List<QuestionDto> questions;
}
