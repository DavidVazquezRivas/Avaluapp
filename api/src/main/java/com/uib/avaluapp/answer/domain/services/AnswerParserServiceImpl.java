package com.uib.avaluapp.answer.domain.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uib.avaluapp.answer.domain.models.Answer;
import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.questions.domain.models.QuestionType;
import com.uib.avaluapp.questions.domain.ports.QuestionPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnswerParserServiceImpl implements AnswerParserService {
    private final QuestionPort questionPort;
    private final ObjectMapper mapper;

    @Override
    public List<Answer> parseAnswersOptions(List<Answer> answers) {
        try {
            Map<Long, String> optionsCache = new HashMap<>();

            return answers.stream()
                    .map(answer -> {
                        try {
                            QuestionType type = answer.getQuestion().getQuestionType();

                            return switch (type) {
                                case SINGLE_CHOICE -> {
                                    Long optionId = Long.parseLong(answer.getAnswer());
                                    String optionText = optionsCache.computeIfAbsent(
                                            optionId,
                                            id -> questionPort.getOptionById(id).getText()
                                    );
                                    yield answer.withAnswer(optionText);
                                }

                                case MULTIPLE_CHOICE -> {
                                    List<String> optionTexts =
                                            Arrays.stream(answer.getAnswer().split(","))
                                                    .map(Long::parseLong)
                                                    .map(optionId -> optionsCache.computeIfAbsent(
                                                            optionId,
                                                            id -> questionPort.getOptionById(id).getText()
                                                    ))
                                                    .toList();

                                    String parsedOptions = mapper.writeValueAsString(optionTexts);
                                    yield answer.withAnswer(parsedOptions);
                                }

                                default -> answer; // Return as is for other types
                            };

                        } catch (Exception e) {
                            throw new RuntimeException("Error procesando respuesta " + answer, e);
                        }
                    })
                    .toList();

        } catch (BaseException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error al parsear respuestas", e);
        }
    }
}
