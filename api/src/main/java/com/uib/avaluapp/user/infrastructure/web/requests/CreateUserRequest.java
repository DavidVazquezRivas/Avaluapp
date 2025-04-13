package com.uib.avaluapp.user.infrastructure.web.requests;

import com.uib.avaluapp.user.domain.models.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateUserRequest {
    private String username;
    private String email;
    private String password;
    private Role role;
}
