package com.uib.avaluapp.global.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BaseException extends RuntimeException {

    private final HttpStatus code;

    public BaseException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        code = exceptionCode.getCode();
    }

    public BaseException() {
        super(ExceptionCode.DEFAULT.getMessage());
        code = ExceptionCode.DEFAULT.getCode();
    }
}
