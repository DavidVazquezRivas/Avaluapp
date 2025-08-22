package com.uib.avaluapp.answer.infrastructure.web.mappers;

import com.uib.avaluapp.answer.domain.models.Answer;
import com.uib.avaluapp.answer.infrastructure.web.models.AnswerDto;
import com.uib.avaluapp.answer.infrastructure.web.models.QuestionAnswersDto;
import com.uib.avaluapp.questions.domain.models.Question;
import com.uib.avaluapp.questions.infrastructure.web.QuestionDtoMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(uses = {QuestionDtoMapper.class})
public interface AnswerDtoMapper {
    AnswerDtoMapper INSTANCE = Mappers.getMapper(AnswerDtoMapper.class);

    AnswerDto toDto(Answer answer);

    List<AnswerDto> toDtoList(List<Answer> answers);

    default List<QuestionAnswersDto> toQuestionDtoList(List<Answer> answers) {
        if (answers == null || answers.isEmpty()) {
            return new ArrayList<>();
        }

        // Agrupar respuestas por pregunta
        Map<Question, List<Answer>> answersGroupedByQuestion = answers.stream()
                .collect(Collectors.groupingBy(Answer::getQuestion));

        // Convertir cada grupo a QuestionAnswersDto
        return answersGroupedByQuestion.entrySet().stream()
                .map(entry -> {
                    Question question = entry.getKey();
                    List<Answer> questionAnswers = entry.getValue();

                    return QuestionAnswersDto.builder()
                            .question(QuestionDtoMapper.INSTANCE.toSimplifiedDto(question))
                            .answers(toDtoList(questionAnswers))
                            .build();
                })
                .collect(Collectors.toList());
    }
}
