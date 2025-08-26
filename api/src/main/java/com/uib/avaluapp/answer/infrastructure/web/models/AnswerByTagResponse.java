package com.uib.avaluapp.answer.infrastructure.web.models;

import com.uib.avaluapp.tags.infrastructure.web.responses.TagDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnswerByTagResponse {
    private TagDto tag;
    private List<QuestionAnswersDto> answers;
}
