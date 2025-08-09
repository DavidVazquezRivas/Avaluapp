package com.uib.avaluapp.questions.domain.models;

public enum QuestionType {
    SINGLE_CHOICE,
    MULTIPLE_CHOICE,
    TEXT,
    NUMERIC,
    RATING,
    DATE;

    public boolean hasOptions() {
        return this == SINGLE_CHOICE ||
                this == MULTIPLE_CHOICE;
    }
}
