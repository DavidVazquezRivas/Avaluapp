package com.uib.avaluapp.auth.domain.utils;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

@Service
public class PasswordGenerator {
    private static final int PASSWORD_LENGTH = 16;
    private static final int FIRST_CHARACTER = (int) '!';
    private static final int LAST_CHARACTER = (int) '~';

    public static String generatePassword() {
        return RandomStringUtils.random(PASSWORD_LENGTH, FIRST_CHARACTER, LAST_CHARACTER, true, true);
    }
}
