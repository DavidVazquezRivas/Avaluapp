package com.uib.avaluapp.questions.infrastructure.web.requests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateOptionRequest {
    private Long id;
    private String text;
    private boolean correct;
}
