package com.uib.avaluapp.user.infrastructure.web.requests;

import com.uib.avaluapp.user.domain.models.Role;
import lombok.Data;

@Data
public class CreateUserRequest {
    private String username;
    private String email;
    private Role role;
}
