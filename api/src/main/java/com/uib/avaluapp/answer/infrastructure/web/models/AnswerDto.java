package com.uib.avaluapp.answer.infrastructure.web.models;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AnswerDto {
    private Long id;
    private String answer;
    private LocalDateTime answeredAt;
}
