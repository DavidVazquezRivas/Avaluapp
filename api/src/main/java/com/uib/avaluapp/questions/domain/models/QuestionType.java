package com.uib.avaluapp.questions.domain.models;

public enum QuestionType {
    SINGLE_CHOICE,
    MULTIPLE_CHOICE,
    TEXT,
    NUMERIC,
    RATING,
    SCALE,
    DATE,
    YES_NO;

    public boolean hasOptions() {
        return this == SINGLE_CHOICE ||
                this == MULTIPLE_CHOICE;
    }
}
