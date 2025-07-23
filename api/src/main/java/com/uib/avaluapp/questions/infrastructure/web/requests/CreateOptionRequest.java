package com.uib.avaluapp.questions.infrastructure.web.requests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateOptionRequest {
    private String text;
    private boolean correct;
}
