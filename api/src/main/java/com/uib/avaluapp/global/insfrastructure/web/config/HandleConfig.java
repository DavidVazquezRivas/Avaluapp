package com.uib.avaluapp.global.insfrastructure.web.config;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.function.Supplier;

@Data
@Builder
public class HandleConfig<T> {
    private final String authorization;
    private final String successMessage;
    private final HttpStatus successStatus;
    private final Supplier<T> adminHandler;
    private final Supplier<T> userHandler;

    public static Supplier<Void> from(Runnable runnable) {
        return () -> {
            runnable.run();
            return null;
        };
    }
}
