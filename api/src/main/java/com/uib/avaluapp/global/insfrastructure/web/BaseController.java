package com.uib.avaluapp.global.insfrastructure.web;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.function.Supplier;

@Slf4j
public abstract class BaseController {
    protected <T> ResponseEntity<ApiResponse<T>> handle(
            Supplier<T> supplier,
            String successMessage,
            HttpStatus successStatus) {

        try {
            T data = supplier.get();
            ApiResponse<T> response = ApiResponse.<T>builder()
                    .success(true)
                    .message(successMessage)
                    .data(data)
                    .build();
            return new ResponseEntity<>(response, successStatus);

        } catch (BaseException e) {
            log.warn("Controlled exception: {}", e.getMessage());
            return ResponseEntity
                    .status(e.getCode())
                    .body(ApiResponse.<T>builder()
                            .success(false)
                            .message(e.getMessage())
                            .build());

        } catch (Exception e) {
            log.error("Unexpected error: ", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<T>builder()
                            .success(false)
                            .message("Unexpected error: " + e.getMessage())
                            .build());
        }
    }

    protected ResponseEntity<ApiResponse<Void>> handle(
            Runnable runnable,
            String successMessage,
            HttpStatus successStatus) {
        try {
            runnable.run();
            return ResponseEntity
                    .status(successStatus)
                    .body(ApiResponse.<Void>builder()
                            .success(true)
                            .message(successMessage)
                            .build());

        } catch (BaseException e) {
            log.warn("Controlled exception: {}", e.getMessage());
            return ResponseEntity
                    .status(e.getCode())
                    .body(ApiResponse.<Void>builder()
                            .success(false)
                            .message(e.getMessage())
                            .build());

        } catch (Exception e) {
            log.error("Unexpected error", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<Void>builder()
                            .success(false)
                            .message("Unexpected error: " + e.getMessage())
                            .build());
        }
    }
}
