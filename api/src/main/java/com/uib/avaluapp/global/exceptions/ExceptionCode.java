package com.uib.avaluapp.global.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ExceptionCode {
    DEFAULT("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR),
    // Auth related exceptions
    INVALID_CREDENTIALS("Invalid username or password", HttpStatus.UNAUTHORIZED),
    INVALID_REFRESH_TOKEN("Invalid refresh token", HttpStatus.UNAUTHORIZED),
    INVALID_TOKEN("Invalid token", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED("Unauthorized", HttpStatus.UNAUTHORIZED),
    INSUFFICIENT_PERMISSIONS("Insufficient permissions", HttpStatus.FORBIDDEN),

    // User related exceptions
    USER_NOT_FOUND("User not found", HttpStatus.NOT_FOUND),
    USER_ALREADY_EXISTS("User already exists", HttpStatus.CONFLICT),

    // Project related exceptions
    PROJECT_NOT_FOUND("Project not found", HttpStatus.NOT_FOUND),
    PROJECT_UNAUTHORIZED("You are not authorized to access this project", HttpStatus.FORBIDDEN),

    // Survey related exceptions
    SURVEY_NOT_FOUND("Survey not found", HttpStatus.NOT_FOUND),
    SURVEY_UNAUTHORIZED("You are not authorized to access this survey", HttpStatus.FORBIDDEN),
    INCONSISTENT_SURVEY_STATUS("The survey is not pending", HttpStatus.CONFLICT),

    // Question related exceptions
    QUESTION_NOT_FOUND("Question not found", HttpStatus.NOT_FOUND),
    QUESTION_TYPE_MISMATCH("Question type mismatch", HttpStatus.BAD_REQUEST),
    OPTION_NOT_FOUND("Option not found", HttpStatus.NOT_FOUND),

    // Tag related exceptions
    TAG_NOT_FOUND("Tag not found", HttpStatus.NOT_FOUND),
    ;


    private final String message;
    private final HttpStatus code;
}
