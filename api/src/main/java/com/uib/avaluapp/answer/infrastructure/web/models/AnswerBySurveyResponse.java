package com.uib.avaluapp.answer.infrastructure.web.models;

import com.uib.avaluapp.surveys.infrastructure.web.responses.SurveyDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnswerBySurveyResponse {
    SurveyDto survey;
    List<QuestionAnswersDto> answers;
}
