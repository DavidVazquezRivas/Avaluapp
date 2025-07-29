package com.uib.avaluapp.questions.domain.models;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Builder
@EqualsAndHashCode(of = "id")
public class Option {
    private Long id;
    private String text;
    private boolean correct;
}
