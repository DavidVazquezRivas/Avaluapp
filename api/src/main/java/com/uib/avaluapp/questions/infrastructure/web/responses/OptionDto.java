package com.uib.avaluapp.questions.infrastructure.web.responses;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OptionDto {
    private Long id;
    private String text;
}
