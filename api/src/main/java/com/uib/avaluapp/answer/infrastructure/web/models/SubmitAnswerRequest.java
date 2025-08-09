package com.uib.avaluapp.answer.infrastructure.web.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubmitAnswerRequest {
    private Long questionId;
    private String answer; // The answer will be serialized as a String
}
