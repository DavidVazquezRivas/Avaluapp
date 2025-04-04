package com.uib.avaluapp.global.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ExceptionCode {
    DEFAULT("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_NOT_FOUND("User not found", HttpStatus.NOT_FOUND),
    USER_ALREADY_EXISTS("User already exists", HttpStatus.CONFLICT);

    private final String message;
    private final HttpStatus code;
}
