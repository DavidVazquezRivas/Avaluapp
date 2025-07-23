package com.uib.avaluapp.questions.domain.ports;

import com.uib.avaluapp.questions.domain.models.Option;

public interface OptionPort {
    Option createOption(Option option);

    Option deleteOption(Long optionId);

    Option updateOption(Option option);
}
