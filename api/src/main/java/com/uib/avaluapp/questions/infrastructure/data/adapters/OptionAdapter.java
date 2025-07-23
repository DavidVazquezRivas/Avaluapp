package com.uib.avaluapp.questions.infrastructure.data.adapters;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.questions.domain.models.Option;
import com.uib.avaluapp.questions.domain.ports.OptionPort;
import com.uib.avaluapp.questions.infrastructure.data.OptionEntityMapper;
import com.uib.avaluapp.questions.infrastructure.data.models.OptionEntity;
import com.uib.avaluapp.questions.infrastructure.data.models.QuestionEntity;
import com.uib.avaluapp.questions.infrastructure.data.repositories.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OptionAdapter implements OptionPort {

    private final OptionRepository optionRepository;

    @Autowired
    public OptionAdapter(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }

    @Override
    public Option createOption(Option option) {
        OptionEntity entity = OptionEntityMapper.INSTANCE.toEntity(option);
        OptionEntity savedEntity = optionRepository.save(entity);
        return OptionEntityMapper.INSTANCE.toDomain(savedEntity);
    }

    @Override
    public Option deleteOption(Long optionId) {
        OptionEntity entity = optionRepository.findById(optionId)
                .orElseThrow(() -> new BaseException(ExceptionCode.OPTION_NOT_FOUND));

        QuestionEntity question = entity.getQuestion();
        question.getOptions().removeIf(opt -> opt.getId().equals(optionId)); // orphanRemoval deletes

        return OptionEntityMapper.INSTANCE.toDomain(entity);
    }

    @Override
    public Option updateOption(Option option) {
        if (!optionRepository.existsById(option.getId())) {
            throw new BaseException(ExceptionCode.OPTION_NOT_FOUND);
        }

        OptionEntity entity = OptionEntityMapper.INSTANCE.toEntity(option);
        OptionEntity savedEntity = optionRepository.save(entity);
        return OptionEntityMapper.INSTANCE.toDomain(savedEntity);
    }
}
