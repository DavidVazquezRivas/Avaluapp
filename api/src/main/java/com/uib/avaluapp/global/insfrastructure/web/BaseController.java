package com.uib.avaluapp.global.insfrastructure.web;

import com.uib.avaluapp.auth.domain.services.JwtService;
import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.global.insfrastructure.web.config.HandleConfig;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.user.domain.models.Role;
import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.ports.UserPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.function.Supplier;

@Slf4j
@RequiredArgsConstructor
public abstract class BaseController {

    private final JwtService jwtService;
    private final UserPort userPort;

    // Used in authorized requests to handle the request based on the user's role
    protected <T> ResponseEntity<ApiResponse<T>> handle(HandleConfig<T> config) {
        try {
            // Check parameters
            if (config.getAuthorization() == null) throw new BaseException(ExceptionCode.UNAUTHORIZED);
            HttpStatus successStatus = Optional.ofNullable(config.getSuccessStatus())
                    .orElse(HttpStatus.OK);
            String successMessage = Optional.ofNullable(config.getSuccessMessage())
                    .orElse("Operation completed successfully");

            // Get user from token
            String token = jwtService.getTokenFromHeader(config.getAuthorization());
            String username = jwtService.extractUsername(token);
            User user = userPort.getUserByUsername(username);

            // Get handler based on role
            Supplier<T> supplier = user.getRole() == Role.ADMIN ? config.getAdminHandler() : config.getUserHandler();
            if (supplier == null) throw new BaseException(ExceptionCode.INSUFFICIENT_PERMISSIONS);

            // Execute handler
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
}
