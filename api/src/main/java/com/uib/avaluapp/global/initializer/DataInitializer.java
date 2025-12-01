package com.uib.avaluapp.global.initializer;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.user.domain.models.Role;
import com.uib.avaluapp.user.domain.services.UserService;
import com.uib.avaluapp.user.infrastructure.web.requests.CreateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final UserService userService;

    // Inject the values from application.properties
    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        this.createAdminUser();
        // createDefaultUser() eliminado
    }

    private void createAdminUser() {
        try {
            CreateUserRequest request = CreateUserRequest
                    .builder()
                    .username(adminUsername)
                    .email(adminEmail)
                    .password(adminPassword)
                    .role(Role.ADMIN)
                    .build();
            
            userService.createUser(request, null);
            System.out.println("--- ADMIN USER CREATED: " + adminUsername + " ---");
            
        } catch (BaseException e) {
            // Managed exception, user already exists, do nothing
            System.out.println("--- ADMIN USER ALREADY EXISTS ---");
        }
    }
}