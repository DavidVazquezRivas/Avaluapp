package com.uib.avaluapp.auth.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws IOException, ServletException {
        try {
            filterChain.doFilter(request, response);
        } catch (BaseException ex) {
            handleBaseException(ex, response);
        } catch (Exception ex) {
            handleGenericException(ex, response);
        }
    }

    private void handleBaseException(BaseException ex, HttpServletResponse response) throws IOException {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .success(false)
                .message(ex.getMessage())
                .build();

        response.setStatus(ex.getCode().value());
        response.setContentType("application/json");
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
    }

    private void handleGenericException(Exception ex, HttpServletResponse response) throws IOException {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .success(false)
                .message("Error interno: " + ex.getMessage())
                .build();

        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.setContentType("application/json");
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
    }
}