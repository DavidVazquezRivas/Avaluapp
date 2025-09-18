package com.uib.avaluapp.global.initializer;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.user.domain.models.Role;
import com.uib.avaluapp.user.domain.services.UserService;
import com.uib.avaluapp.user.infrastructure.web.requests.CreateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {
        this.createAdminUser();
        this.createDefaultUser();
    }

    private void createAdminUser() {
        try {
            CreateUserRequest request = CreateUserRequest
                    .builder()
                    .username("admin")
                    .email("admin")
                    .password("admin")
                    .role(Role.ADMIN)
                    .build();
            userService.createUser(request, null);
        } catch (BaseException e) {
            // Managed exception, user already exists, do nothing
        }

    }

    private void createDefaultUser() {
        try {
            CreateUserRequest request = CreateUserRequest
                    .builder()
                    .username("user")
                    .email("user")
                    .password("user")
                    .role(Role.USER)
                    .build();
            userService.createUser(request, null);
        } catch (BaseException e) {
            // Managed exception, user already exists, do nothing
        }
    }
}
